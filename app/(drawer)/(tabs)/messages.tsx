import Button from "@/components/button";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors, spacingY } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Messages = () => {
  return (
    <ScreenWrapper showPattern>
      <View style={styles.container}>
        {/* CENTER CONTENT */}
        <View style={styles.centerContent}>
          <Image
            source={require("@/assets/images/no-message.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* BOTTOM BUTTONS */}
        <View style={styles.bottomButtons}>
          <Button
            style={styles.loginBtn}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.btnText}>Login</Text>
          </Button>

          <Button
            style={styles.signupBtn}
            onPress={() => router.push("/auth/register")}
          >
            <Text style={styles.btnText}>Sign Up</Text>
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 220,
    height: 220,
  },

  bottomButtons: {
    flexDirection: "row",
    gap: 18,
    paddingHorizontal: 24,
    paddingBottom: spacingY._5,
  },

  loginBtn: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  signupBtn: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
  },

  btnText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 15,
    backgroundColor: "transparent",
  },
});
