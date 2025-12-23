import { colors } from "@/constants/theme";
import { scale } from "@/utils/styling";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const DOTS = 3;

const ButtonLoader = () => {
  const animations = useRef(
    Array.from({ length: DOTS }).map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const loops = animations.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 150),
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      )
    );

    loops.forEach((loop) => loop.start());

    return () => loops.forEach((loop) => loop.stop());
  }, []);

  return (
    <View style={styles.container}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              opacity: anim,
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 1],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

export default ButtonLoader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: scale(6),
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: colors.black,
  },
});
