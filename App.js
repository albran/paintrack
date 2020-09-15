import React from "react";
import { StyleSheet, View } from "react-native";

import MovingBall from "./components/MovingBall";

export default function App() {
  return (
    <View style={styles.container}>
      <MovingBall />
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
