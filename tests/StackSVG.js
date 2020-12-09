import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const StackSVG = () => (
  <View style={styles.container}>
    <Pressable onPress={() => console.log("Circle 1 pressed")}>
      <Svg style={{ position: "absolute" }} height={300} width={300}>
        <Circle cx="50" cy="50" r="50" fill="pink" />
      </Svg>
    </Pressable>
    <Pressable onPress={() => console.log("Circle 2 pressed")}>
      <Svg style={{ position: "absolute" }} height={300} width={300}>
        <Circle cx="150" cy="150" r="50" fill="pink" />
      </Svg>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  svg1: {
    borderWidth: 2,
    borderColor: "blue",
  },
  svg2: {
    borderWidth: 1,
    borderColor: "red",
  },
});

export default StackSVG;
