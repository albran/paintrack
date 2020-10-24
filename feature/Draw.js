import React, { useState } from "react";
import { View } from "react-native";
import { set } from "react-native-reanimated";

import Canvas from "./Canvas";
import Tooltip from "./Tooltip";

const Draw = ({ winWidth, winHeight }) => {
  const [liveStroke, setLiveStroke] = useState();
  return (
    <View style={{ flex: 1 }}>
      <Canvas
        winWidth={winWidth}
        liveStroke={liveStroke}
        setLiveStroke={setLiveStroke}
      />
      <Tooltip liveStroke={liveStroke} setLiveStroke={setLiveStroke} />
    </View>
  );
};

export default Draw;
