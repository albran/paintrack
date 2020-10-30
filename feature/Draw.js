import React, { useEffect, useReducer, useRef, useState } from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";

import Canvas from "./Canvas";
import CanvasKeyboardOverlay from "./CanvasKeyboardOverlay";
import Tooltip from "./Tooltip";
import { DrawStates } from "../library/globals";

const liveStrokeReducer = (state, dispatch) => {
  switch (dispatch.do) {
    case "init":
      return { ...dispatch.props };
    case "append":
      return { ...state, ...dispatch.props };
    case "delete":
      return null;
  }
};

const Draw = ({ winWidth, winHeight }) => {
  const [liveStroke, updateLiveStroke] = useReducer(liveStrokeReducer, null);

  const [drawState, setDrawState] = useState(DrawStates.Navigating);

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
          updateLiveStroke={updateLiveStroke}
          drawState={drawState}
          setDrawState={setDrawState}
          strokes={strokes}
          infoStroke={infoStroke}
          setInfoStroke={setInfoStroke}
          saveStroke={saveStroke}
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
