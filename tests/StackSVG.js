import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Circle } from "react-native-svg";
import TouchableOpacityG from "./TouchableOpacityG";

const StackSVG = () => (
  <View style={styles.container}>
    <Svg height={300} width={300}>
      <TouchableOpacityG>
        <Circle cx="50" cy="50" r="50" fill="pink" />
      </TouchableOpacityG>
    </Svg>
    <Svg height={300} width={300} style={{ position: "absolute" }}>
      <TouchableOpacityG>
        <Circle cx="150" cy="150" r="50" fill="pink" />
      </TouchableOpacityG>
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  svg1: {
    borderWidth: 2,
    borderColor: "blue",
    //position: "absolute",
  },
  svg2: {
    borderWidth: 1,
    borderColor: "red",
    position: "absolute",
  },
});

export default StackSVG;
