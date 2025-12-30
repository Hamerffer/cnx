import { colors } from "@/constants/theme";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function ChartSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.overlay}>
      <View style={styles.header} />

      <View style={styles.chartArea}>
        {[...Array(24)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.candle,
              {
                height: 20 + Math.random() * 80,
                opacity,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: colors.background,
    padding: 12,
    zIndex: 20,
  },

  header: {
    height: 56,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: 12,
  },

  chartArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
  },

  candle: {
    width: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: 4,
  },
});
