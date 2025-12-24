import { colors, spacingX, spacingY } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Href, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomDrawer(props: any) {
  const router = useRouter();

  const Item = ({
    icon,
    label,
    route,
    badge,
  }: {
    icon: any;
    label: string;
    route?: Href;
    badge?: number;
  }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => route && router.push(route as any)}
    >
      <Ionicons name={icon} size={22} color={colors.white} />
      <Text style={styles.itemText}>{label}</Text>

      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {/* TOP ACCOUNT SECTION */}
      <View style={styles.header}>
        <Text style={styles.name}>Xyz Xyz</Text>
        <Text style={styles.account}>4579899 - NCMGlobal-Demo</Text>

        <View style={styles.demoTag}>
          <Text style={styles.demoText}>DEMO</Text>
        </View>
        <TouchableOpacity>
          <Text
            style={styles.manage}
            onPress={() => router.push("/(drawer)/(tabs)/account-card")}
          >
            Manage accounts
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* MENU ITEMS */}
      <Item icon="trending-up" label="Trade" route="/(drawer)/(tabs)/quotes" />
      <Item icon="newspaper-outline" label="Broker" route="/broker" />

      <Item icon="help-circle-outline" label="User guide" />
      <Item
        icon="information-circle-outline"
        label="About"
        route={"/(drawer)/about"}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacingX._20,
  },
  name: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  account: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  demoTag: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#22c55e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  demoText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 10,
  },
  manage: {
    marginTop: 12,
    color: colors.primary,
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacingY._10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacingY._12,
    paddingHorizontal: spacingX._20,
  },
  itemText: {
    color: colors.white,
    fontSize: 15,
    marginLeft: spacingX._15,
    flex: 1,
  },
  badge: {
    backgroundColor: "#ef4444",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
});
