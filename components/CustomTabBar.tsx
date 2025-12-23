// import React from "react";
// import { BottomTabBar, BottomTabItem } from "expo-router/bottom-tabs";
// import { View, StyleSheet } from "react-native";
// import { scale } from "@/utils/styling";
// import {
//   ArrowUpDown,
//   LineChart,
//   BarChart3,
//   History as HistoryIcon,
//   MessageCircle,
// } from "lucide-react-native";
// import { colors } from "@/constants/theme";

// const ICONS = [
//   { name: "quotes", icon: ArrowUpDown },
//   { name: "charts", icon: LineChart },
//   { name: "trade", icon: BarChart3 },
//   { name: "history", icon: HistoryIcon },
//   { name: "messages", icon: MessageCircle },
// ];

// export default function CustomTabBar() {
//   return (
//     <BottomTabBar
//       style={styles.bar}
//       itemStyle={styles.item}
//     >
//       {ICONS.map(({ name, icon: Icon }) => (
//         <BottomTabItem
//           key={name}
//           href={`/${name}`}
//           icon={({ color }) => (
//             <Icon size={scale(22)} color={color} />
//           )}
//           activeColor={colors.primary}
//           inactiveColor="#9ca3af"
//         />
//       ))}
//     </BottomTabBar>
//   );
// }

// const styles = StyleSheet.create({
//   bar: {
//     backgroundColor: "#0b0d10",
//     paddingVertical: scale(8),
//   },
//   item: {
//     padding: scale(6),
//   },
// });
