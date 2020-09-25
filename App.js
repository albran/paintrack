import React from "react";
import { StyleSheet, View } from "react-native";

import MovingBall from "./components/MovingBall";
import PGCanvas from "./components/PGCanvas";
import PinchCircle from "./components/PinchCircle";
import Canvas from "./feature/Canvas";
import Drawer from "./feature/Drawer";
import StackSVG from "./components/StackSVG";
import CircleTranform from "./components/CircleTranform";

export default function App() {
  return (
    <View style={styles.container}>
      <Drawer />
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
});
