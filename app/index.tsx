import Button from "@/components/button";
import OpenDemoModal from "@/components/modals/open-demo-modals";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Welcome = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <ScreenWrapper showPattern bgOpacity={0.9}>
      <View style={styles.container}>
        {/* Top Image */}
        <Image
          source={require("@/assets/images/wallet.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Text Section */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>
            Cnx<Text style={styles.highlight}>Trade</Text>
          </Text>

          <Text style={styles.subtitle}>
            All markets. One powerful platform.
          </Text>
        </View>

        <Button
          style={styles.button}
          onPress={() => router.replace("/(drawer)/(tabs)/quotes")}
        >
          <Text style={styles.btnText}>Get started</Text>
        </Button>
      </View>
      <OpenDemoModal visible={showModal} onClose={() => setShowModal(false)} />
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: verticalScale(40),
  },

  image: {
    width: "100%",
    height: verticalScale(420),
    alignSelf: "center",
  },

  textWrapper: {
    alignItems: "center",
    marginTop: verticalScale(20),
  },

  title: {
    color: colors.white,
    fontSize: scale(28),
    fontWeight: "700",
  },

  highlight: {
    color: colors.primary, // blue accent
  },

  subtitle: {
    marginTop: verticalScale(8),
    color: colors.textSecondary ?? "#9ca3af",
    fontSize: scale(14),
    textAlign: "center",
  },

  button: {
    marginHorizontal: scale(20),
  },

  btnText: {
    color: colors.textPrimary,
    fontSize: scale(16),
    fontWeight: "600",
  },
});
