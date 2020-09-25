import React from "react";
import { Animated, StyleSheet } from "react-native";

const CircleTranform = () => (
  <Animated.View
    style={[
      styles.circle,
      {
        transform: [{ scale: 4 }],
      },
    ]}
  />
);

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
  },
});

export default CircleTranform;
