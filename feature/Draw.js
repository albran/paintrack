import React, { useEffect, useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";

import Canvas from "./Canvas";
import CanvasKeyboardOverlay from "./CanvasKeyboardOverlay";
import Tooltip from "./Tooltip";
import { DrawStates } from "../library/globals";

const Draw = ({ winWidth, winHeight }) => {
  const [drawState, setDrawState] = useState(DrawStates.Navigating);
  const [liveStroke, setLiveStroke] = useState();
  const updateLiveStroke = (obj) => {
    setLiveStroke({ ...(liveStroke ? liveStroke : {}), ...obj });
  };
  const [strokes, setStrokes] = useState([]);
  const saveStroke = () => {
    setStrokes([...strokes, liveStroke]);
    setLiveStroke();
  };
  const [infoStroke, setInfoStroke] = useState();

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
          infoStroke={infoStroke}
          setInfoStroke={setInfoStroke}
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
        infoStroke={infoStroke}
      />
    </KeyboardAvoidingView>
  );
};

export default Draw;
