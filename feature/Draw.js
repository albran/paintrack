import React, { useEffect, useReducer, useState } from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import Canvas from "./Canvas";
import CanvasKeyboardOverlay from "./CanvasKeyboardOverlay";
import Tooltip from "./Tooltip";
import { DrawStates } from "../library/globals";
import getYYYYMMDD from "../library/getYYYYMMDD";

const liveStrokeReducer = (state, dispatch) => {
  switch (dispatch.do) {
    case "init":
      return { ...dispatch.props };
    case "append":
      return { ...state, ...dispatch.props };
    case "set":
      return { ...dispatch.props };
    case "delete":
      return null;
  }
};

const strokesReducer = (state, dispatch) => {
  switch (dispatch.do) {
    case "append":
      return [...state, { ...dispatch.payload }];
    case "set":
      return [...dispatch.payload];
    case "delete":
      return state.filter((val, i) => dispatch.i !== i);
  }
};

const Draw = ({ winWidth, winHeight }) => {
  const modelScale = winWidth / 344;
  const canvasHeight = 400 * modelScale;

  const [drawState, setDrawState] = useState(DrawStates.Navigating);
  const [liveStroke, updateLiveStroke] = useReducer(liveStrokeReducer, null);
  const [strokes, updateStrokes] = useReducer(strokesReducer, []);
  const [keyboard, setKeyboard] = useState(false);

  const saveDay = async () => {
    try {
      const datestampKey = getYYYYMMDD(Date());
      const jsonVal = JSON.stringify(strokes);
      await AsyncStorage.setItem(datestampKey, jsonVal);
    } catch (e) {
      console.log(`Error saving strokes: ${e}`);
    }
  };

  const getDay = async (datestampKey) => {
    try {
      const jsonVal = await AsyncStorage.getItem(datestampKey);
      return jsonVal != null ? JSON.parse(jsonVal) : [];
    } catch (e) {
      console.log(`Error retrieving strokes: ${e}`);
    }
  };

  useEffect(() => {
    getDay(getYYYYMMDD(Date())).then((val) =>
      updateStrokes({ do: "set", payload: val })
    );

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
          updateStrokes={updateStrokes}
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
        updateStrokes={updateStrokes}
        saveDay={saveDay}
      />
    </KeyboardAvoidingView>
  );
};

export default Draw;
