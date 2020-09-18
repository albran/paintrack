import React from "react";
import { StyleSheet, View } from "react-native";

import MovingBall from "./components/MovingBall";
import PGCanvas from "./components/PGCanvas";
import PinchCircle from "./components/PinchCircle";
import Canvas from "./feature/Canvas";
import Drawer from "./feature/Drawer";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.circle} /> */}
      <Canvas />
      {/* <PGCanvas /> */}
      {/* <PinchCircle /> */}
      {/* <Drawer /> */}
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
