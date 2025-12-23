import ScreenWrapper from "@/components/screen-Wrapper";
import { Box } from "@/components/ui/box"; // Gluestack's universal container
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { colors } from "@/constants/theme"; // Import your custom colors
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

// Define your component
function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Simple validation logic
  const validateForm = () => {
    let isValid = true;

    // Reset errors before validation
    setEmailError("");
    setPasswordError("");

    // 1. Email Validation
    if (!email.includes("@") || email.length < 5) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    // 2. Password Validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);
      console.log("Submitting form with:", { email, password });

      // --- Simulation of API Call ---
      setTimeout(() => {
        setIsLoading(false);
        alert("Login Successful!"); // Replace with actual navigation/state change
      }, 1500);
      // -------------------------------
    } else {
      console.log("Form has errors. Not submitting.");
    }
  };

  return (
    // ScreenWrapper should ideally manage the app's background color
    <ScreenWrapper >
      <Box style={styles.container} >
        {/* Header Text: Uses your primary brand color */}
        <Text style={styles.header}>Welcome Back</Text>

        <VStack space="xl" style={styles.container}>
          {/* --- 1. Email Field --- */}
          <FormControl isInvalid={!!emailError} size="md" isRequired={true}>
            <FormControlLabel>
              {/* Label Text: Uses textSecondary color */}
              <FormControlLabelText
                style={{ color: colors.textSecondary, marginBottom: 4 }}
              >
                Email
              </FormControlLabelText>
            </FormControlLabel>
            {/* Input: Set background, border, and text color for dark mode */}
            <Input size="md" style={styles.inputContainer}>
              <InputField
                placeholder="Enter your email"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={handleSubmit}
                style={{ color: colors.textPrimary }} // Input text color
              />
            </Input>
            {/* Error Message: Uses your negative/sell color for destructive messaging */}
            {!!emailError && (
              <FormControlError>
                <FormControlErrorIcon
                  as={AlertCircleIcon}
                  style={{ color: colors.negative }}
                />
                <FormControlErrorText style={{ color: colors.negative }}>
                  {emailError}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* --- 2. Password Field --- */}
          <FormControl isInvalid={!!passwordError} size="md" isRequired={true}>
            <FormControlLabel>
              {/* Label Text: Uses textSecondary color */}
              <FormControlLabelText
                style={{ color: colors.textSecondary, marginBottom: 4 }}
              >
                Password
              </FormControlLabelText>
            </FormControlLabel>
            <Input size="md" style={styles.inputContainer}>
              <InputField
                type="password"
                placeholder="Enter your password"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleSubmit}
                style={{ color: colors.textPrimary }} // Input text color
              />
            </Input>
            {/* Helper Text: Uses textMuted color */}
            {!passwordError && (
              <FormControlHelper>
                <FormControlHelperText style={{ color: colors.textMuted }}>
                  Minimum 6 characters required.
                </FormControlHelperText>
              </FormControlHelper>
            )}
            {/* Error Message: Uses your negative/sell color */}
            {!!passwordError && (
              <FormControlError>
                <FormControlErrorIcon
                  as={AlertCircleIcon}
                  style={{ color: colors.negative }}
                />
                <FormControlErrorText style={{ color: colors.negative }}>
                  {passwordError}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* --- 3. Submit Button --- */}
          {/* Button: Use your primary color for the solid variant background */}
          <Button
            size="md"
            variant="solid"
            onPress={handleSubmit}
            isDisabled={isLoading}
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            {isLoading ? (
              // Use ActivityIndicator with white color over the dark button
              <ActivityIndicator color={colors.white} />
            ) : (
              // Button Text: Use white for text over the primary button color
              <ButtonText style={{ color: colors.white }}>Log In</ButtonText>
            )}
          </Button>

          {/* --- 4. Forgot Password Link --- */}
          <Button variant="link" size="sm" style={styles.forgotPasswordButton}>
            <ButtonText style={{ color: colors.textSecondary }}>
              Forgot Password?
            </ButtonText>
          </Button>
        </VStack>
      </Box>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    marginVertical: "auto",
    // Note: The Box background will likely inherit from ScreenWrapper,
    // which should be set to colors.background or colors.surface.
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: colors.primary, // Using your brand's primary color
  },
  inputContainer: {
    backgroundColor: colors.surface, // Use a dark surface color for the input field background
    borderColor: colors.border, // Use your border color
  },
  button: {
    marginTop: 20,
  },
  forgotPasswordButton: {
    alignSelf: "center",
    marginTop: 10,
  },
});

export default LoginForm;
