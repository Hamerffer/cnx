import CustomDrawer from "@/components/customDrawer";
import { Drawer } from "expo-router/drawer";

function Layout() {
  
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Trade",
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
        }}
      />
      <Drawer.Screen
        name="test"
        options={{
          drawerLabel: "Test",
        }}
      />
    </Drawer>
  );
}
export default Layout;