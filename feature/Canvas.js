import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import Drawer from "./Drawer";

const Canvas = () => {
  const [strokes, setStrokes] = useState([]);
  const addStroke = (stroke) => {
    setStrokes([...strokes, stroke]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Drawer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 700,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
  },
});

export default Canvas;
