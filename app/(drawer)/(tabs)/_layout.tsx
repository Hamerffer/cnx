import ScreenWrapper from "@/components/screen-Wrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, Tabs, useNavigation } from "expo-router";
import { ChartCandlestick } from "lucide-react-native";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import MoreMenu from "@/components/custom-menu";
import { showAlert } from "@/utils/show-alert";
import { DrawerActions } from "@react-navigation/native";
// import { useState } from "react";

export default function TabLayout() {
  // const [menuVisible, setMenuVisible] = useState(false);
  // const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 6,
            paddingTop: 6,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "500",
          },
        }}
      >
        {/* Quotes Tab */}
        <Tabs.Screen
          name="quotes"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="exchange" size={20} color={color} />
            ),
            header: () => (
              <View
                style={{
                  height: spacingY._50,
                  backgroundColor: colors.background,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: spacingX._15,
                }}
              >
                {/* Left: Hamburger */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: spacingX._15,
                  }}
                >
                  <TouchableOpacity
                    style={{}}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.openDrawer)
                    }
                  >
                    <FontAwesome name="bars" size={24} color={colors.white} />
                  </TouchableOpacity>
                  {/* Center: Title */}
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Quotes
                  </Text>
                </View>

                {/* Right: + and Message icons */}
                <View style={{ flexDirection: "row", gap: spacingX._12 }}>
                  <TouchableOpacity style={{ padding: spacingX._5 }}>
                    <FontAwesome name="plus" size={22} color={colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ padding: spacingX._5 }}
                    onPress={() => router.push("/select-symbol")}
                  >
                    <FontAwesome
                      name="pencil-square-o"
                      size={22}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="charts"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="bar-chart" size={20} color={color} />
            ),
            header: () => (
              <View
                style={{
                  height: spacingY._50,
                  backgroundColor: colors.background,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: spacingX._15,
                }}
              >
                {/* Left: Hamburger */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: spacingX._15,
                  }}
                >
                  <TouchableOpacity
                    style={{}}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.openDrawer())
                    }
                  >
                    <FontAwesome name="bars" size={24} color={colors.white} />
                  </TouchableOpacity>
                  {/* Center: Title */}
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Charts
                  </Text>
                </View>

                {/* Right: + and Message icons */}
                <View style={{ flexDirection: "row", gap: spacingX._12 }}>
                  <TouchableOpacity style={{ padding: spacingX._5 }}>
                    <FontAwesome name="plus" size={22} color={colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: spacingX._5 }}>
                    <FontAwesome
                      name="comments"
                      size={22}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="trade"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="line-chart" size={22} color={color} />
            ),
            header: () => (
              <View
                style={{
                  height: spacingY._50,
                  backgroundColor: colors.background,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: spacingX._15,
                }}
              >
                {/* Left: Hamburger */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: spacingX._15,
                  }}
                >
                  <TouchableOpacity
                    style={{}}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.openDrawer())
                    }
                  >
                    <FontAwesome name="bars" size={24} color={colors.white} />
                  </TouchableOpacity>
                  {/* Center: Title */}
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Trade
                  </Text>
                </View>

                {/* Right: + and Message icons */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <MoreMenu
                    items={[
                      { key: "Order", onPress: () => console.log("Order") },
                      { key: "Time", onPress: () => console.log("Time") },
                      { key: "Symbol", onPress: () => console.log("Symbol") },
                      { key: "Profit", onPress: () => console.log("Profit") },
                    ]}
                  />

                  <TouchableOpacity
                    style={{
                      paddingHorizontal: spacingX._10,
                      paddingVertical: spacingX._5,
                    }}
                    onPress={() => router.push("/(drawer)/buy-sell")}
                  >
                    <ChartCandlestick size={22} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="history" size={20} color={color} />
            ),
            header: () => (
              <View
                style={{
                  height: spacingY._50,
                  backgroundColor: colors.background,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: spacingX._15,
                }}
              >
                {/* Left: Hamburger */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: spacingX._15,
                  }}
                >
                  <TouchableOpacity
                    style={{}}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.openDrawer())
                    }
                  >
                    <FontAwesome name="bars" size={24} color={colors.white} />
                  </TouchableOpacity>
                  {/* Center: Title */}
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    History
                  </Text>
                </View>

                {/* Right: + and Message icons */}
                <View style={{ flexDirection: "row", gap: spacingX._12 }}>
                  <TouchableOpacity style={{ padding: spacingX._5 }}>
                    <FontAwesome name="plus" size={22} color={colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: spacingX._5 }}>
                    <FontAwesome
                      name="comments"
                      size={22}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="messages"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="comments" size={20} color={color} />
            ),
            header: () => (
              <View
                style={{
                  height: spacingY._50,
                  backgroundColor: colors.background,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: spacingX._15,
                }}
              >
                {/* Left: Hamburger */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: spacingX._15,
                  }}
                >
                  <TouchableOpacity
                    style={{}}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.openDrawer())
                    }
                  >
                    <FontAwesome name="bars" size={24} color={colors.white} />
                  </TouchableOpacity>
                  {/* Center: Title */}
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Message
                  </Text>
                </View>

                {/* Right: + and Message icons */}
                <View style={{ flexDirection: "row", gap: spacingX._12 }}>
                  <TouchableOpacity style={{ padding: spacingX._5 }}>
                    <FontAwesome name="plus" size={22} color={colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: spacingX._5 }}>
                    <FontAwesome
                      name="comments"
                      size={22}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="account-card"
          options={{
            href: null,

            tabBarIcon: ({ color }) => (
              <FontAwesome name="bar-chart" size={20} color={color} />
            ),

            header: () => (
              <View
                style={{
                  height: spacingY._50,
                  backgroundColor: colors.background,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: spacingX._15,
                }}
              >
                {/* Left */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: spacingX._15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.dispatch(DrawerActions.openDrawer())
                    }
                  >
                    <FontAwesome name="bars" size={24} color={colors.white} />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Charts
                  </Text>
                </View>

                {/* Right */}
                <View style={{ flexDirection: "row", gap: spacingX._12 }}>
                  <TouchableOpacity style={{ padding: spacingX._5 }}>
                    <FontAwesome name="plus" size={22} color={colors.white} />
                  </TouchableOpacity>

                  <MoreMenu
                    items={[
                      {
                        key: "Change Master Password",
                        onPress: () =>
                          router.push("/password/change-master-password"),
                      },
                      {
                        key: "Change Investor Password",
                        onPress: () =>
                          router.push("/password/change-investor-password"),
                      },
                      { key: "Delete Account", onPress: () => deleteAccount() },
                      {
                        key: "Clear Saved Password",
                        onPress: () => clearSavedPassword(),
                      },
                    ]}
                  />
                </View>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="properties"
          options={{
            href: null,

            tabBarIcon: ({ color }) => (
              <FontAwesome name="bar-chart" size={20} color={color} />
            ),

            header: () => (
              <View
                style={{
                  height: spacingY._10,
                  backgroundColor: colors.background,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: spacingX._15,
                }}
              ></View>
            ),
          }}
        />
      </Tabs>
    </ScreenWrapper>
  );
}

const clearSavedPassword = () => {
  showAlert({
    title: "Clear Saved Password",
    message: "Are you sure you want to clear saved password?",
    onConfirm: () => {
      Alert.alert("Saved Password Cleared");
    },
  });
};

const deleteAccount = () => {
  showAlert({
    title: "Delete Account",
    message: "This action cannot be undone. Continue?",
    confirmText: "Delete",
    onConfirm: () => {
      Alert.alert("Account Deleted");
    },
  });
};
