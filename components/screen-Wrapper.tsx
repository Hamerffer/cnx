import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types";
import React from "react";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenWrapper = ({
  style,
  children,
  isModal = false,
  showPattern = false,
  bgOpacity = 1,
}: ScreenWrapperProps) => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={[styles.container, isModal && styles.modalBg, style]}>
        {/* Background Pattern */}
        {showPattern && (
          <ImageBackground
            source={require("@/assets/images/bgPattern.png")}
            style={styles.pattern}
            resizeMode="repeat"
          />
        )}

        {/* Foreground Content */}
        <View style={[styles.content, { opacity: bgOpacity }]}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: "relative",
  },

  modalBg: {
    backgroundColor: "rgba(0,0,0,0.75)",
  },

  pattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.06,
    zIndex: 0,
  },

  content: {
    flex: 1,
    zIndex: 1,
  },
});
