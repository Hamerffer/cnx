import { colors } from "@/constants/theme";
import { ButtonProps } from "@/types";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import ButtonLoader from "./loader";
const Button = ({
  style,
  onPress,
  loading = false,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, (disabled || loading) && styles.disabled, style]}
      {...rest}
    >
      {loading ? <ButtonLoader /> : children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.6,
  },
});
