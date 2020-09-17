import React from "react";
import { StyleSheet, View } from "react-native";

import MovingBall from "./components/MovingBall";
import Canvas from "./components/Canvas";
import PGCanvas from "./components/PGCanvas";
import PinchCircle from "./components/PinchCircle";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.circle} /> */}
      {/* <Canvas /> */}
      {/* <PGCanvas /> */}
      <PinchCircle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
});
