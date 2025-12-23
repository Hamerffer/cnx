import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { EllipsisVertical } from "lucide-react-native";

type MenuItem = {
  key: string;
  onPress?: () => void;
  danger?: boolean;
};

type Props = {
  items: (MenuItem | { divider: true })[];
  icon?: React.ReactNode;
  menuStyle?: ViewStyle;
  triggerStyle?: ViewStyle;
};

export default function MoreMenu({
  items,
  icon,
  menuStyle,
  triggerStyle,
}: Props) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { width } = Dimensions.get("window");
  const MENU_WIDTH = Math.min(220, width - 32);

  return (
    <View>
      {/* Trigger */}
      <Pressable
        onPress={openMenu}
        hitSlop={10}
        style={[styles.trigger, triggerStyle]}
      >
        {icon ?? <EllipsisVertical color="#fff" size={22} />}
      </Pressable>

      {/* Menu */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay}>
            <View style={[styles.menu, { width: MENU_WIDTH }, menuStyle]}>
              {items.map((item, index) =>
                "divider" in item ? (
                  <View key={`divider-${index}`} style={styles.divider} />
                ) : (
                  <TouchableOpacity
                    key={item.key}
                    activeOpacity={0.7}
                    style={styles.item}
                    onPress={() => {
                      closeMenu();
                      item.onPress?.();
                    }}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        item.danger && { color: "#ff453a" },
                      ]}
                    >
                      {item.key}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  trigger: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },

  overlay: {
    flex: 1,
  },

  menu: {
    position: "absolute",
    right: 12,
    top: 56,
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    paddingVertical: 6,

    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  itemText: {
    color: "#fff",
    fontSize: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "#2c2c2e",
    marginVertical: 6,
  },
});
