import React from "react";
import { View } from "react-native";

import Canvas from "./Canvas";
import Tooltip from "./Tooltip";

const Draw = ({ winWidth, winHeight }) => {
  return (
    <View style={{ flex: 1 }}>
      <Canvas winWidth={winWidth} />
      <Tooltip />
    </View>
  );
};

export default Draw;
