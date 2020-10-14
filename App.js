import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import MovingBall from "./components/MovingBall";
import PGCanvas from "./components/PGCanvas";
import PinchCircle from "./components/PinchCircle";
import Canvas from "./feature/Canvas";
import Drawer from "./feature/Drawer";
import StackSVG from "./components/StackSVG";
import CircleTranform from "./components/CircleTranform";
import Strokes from "./components/Strokes";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Drawer />
      {/* <Strokes /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
