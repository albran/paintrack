import React, { useState } from "react";
import { View } from "react-native";

import Canvas from "./Canvas";
import Tooltip from "./Tooltip";

const DrawStates = Object.freeze({
  Pinching: "PINCHING",
  Drawing: "DRAWING",
  Typing: "TYPING",
  Scaling: "SCALING",
  Patterning: "PATTERNING",
  Noting: "NOTING",
});

const Stroke = Object.freeze({
  path: "path",
  width: "width",
  view: "view",
  depth: "depth",
  type: "type",
  scale: "scale",
  pattern: "pattern",
  note: "note",
});

const Draw = ({ winWidth, winHeight }) => {
  const [drawState, setDrawState] = useState(DrawStates.Pinching);
  const [liveStroke, setLiveStroke] = useState();
  const updateLiveStroke = (obj) => {
    setLiveStroke({ ...(liveStroke ? liveStroke : {}), ...obj });
  };
  return (
    <View style={{ flex: 1 }}>
      <Canvas
        winWidth={winWidth}
        liveStroke={liveStroke}
        setLiveStroke={setLiveStroke}
        drawState={drawState}
        setDrawState={setDrawState}
      />
      <Tooltip
        liveStroke={liveStroke}
        updateLiveStroke={updateLiveStroke}
        drawState={drawState}
        setDrawState={setDrawState}
      />
    </View>
  );
};

export default Draw;
