import React from "react";
import { StyleSheet, View } from "react-native";

import MovingBall from "./components/MovingBall";
import Canvas from "./components/Canvas";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MovingBall /> */}
      <Canvas />
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
