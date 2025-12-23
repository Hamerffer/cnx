import { View, Text } from "react-native";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors } from "@/constants/theme";

export default function ProfileScreen() {
  return (
    <ScreenWrapper>
      <Text style={{ color: colors.white, fontSize: 18 }}>
        Profile
      </Text>
    </ScreenWrapper>
  );
}
