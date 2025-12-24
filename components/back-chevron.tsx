import { colors, spacingX, spacingY } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AppHeaderProps = {
  title: string;
  backTo?: string; // optional route
};

const AppHeader = ({ title, backTo }: AppHeaderProps) => {
  const handleBack = () => {
    if (backTo) {
      router.replace(backTo as any);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={colors.white}
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>

      {/* Right spacer to keep title centered */}
      <View style={{ width: 24 }} />
    </View>
  );
};

export default AppHeader;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: spacingY._50,
    paddingHorizontal: spacingX._10,
    // backgroundColor: colors.background,
  },

  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: spacingX._15,
    flex: 1,
  },
});
