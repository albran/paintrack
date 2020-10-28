import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Canvas from "./Canvas";
import CanvasKeyboardOverlay from "./CanvasKeyboardOverlay";
import Tooltip from "./Tooltip";

const DrawStates = Object.freeze({
  Viewing: "VIEWING",
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
  const [drawState, setDrawState] = useState(DrawStates.Viewing);
  const [liveStroke, setLiveStroke] = useState();
  const updateLiveStroke = (obj) => {
    setLiveStroke({ ...(liveStroke ? liveStroke : {}), ...obj });
  };
  const [strokes, setStrokes] = useState([]);
  const saveStroke = () => setStrokes([...strokes, liveStroke]);

  const [keyboard, setKeyboard] = useState(false);

  const modelScale = winWidth / 344;
  const canvasHeight = 400 * modelScale;

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", keyboardWillShow);
    Keyboard.addListener("keyboardWillHide", keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardWillShow);
      Keyboard.removeListener("keyboardWillHide", keyboardWillHide);
    };
  }, []);

  const keyboardWillShow = () => {
    setKeyboard(true);
  };

  const keyboardWillHide = () => {
    setKeyboard(false);
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={20}
      contentContainerStyle={{ width: "100%", height: "100%" }}
    >
      <View>
        <Canvas
          winWidth={winWidth}
          liveStroke={liveStroke}
          setLiveStroke={setLiveStroke}
          drawState={drawState}
          setDrawState={setDrawState}
          strokes={strokes}
        />
        {keyboard && (
          <CanvasKeyboardOverlay
            keyboard={keyboard}
            winWidth={winHeight}
            canvasHeight={canvasHeight}
            setDrawState={setDrawState}
          />
        )}
      </View>
      <Tooltip
        liveStroke={liveStroke}
        updateLiveStroke={updateLiveStroke}
        drawState={drawState}
        setDrawState={setDrawState}
        saveStroke={saveStroke}
      />
    </KeyboardAvoidingView>
  );
};

export default Draw;
