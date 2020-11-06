import React, { useEffect, useReducer, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  useWindowDimensions,
  View,
} from "react-native";
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

const factorsReducer = (state, dispatch) => {
  switch (dispatch.do) {
    case "set":
      return { ...dispatch.payload };
    case "toggle":
      return { ...state, ...dispatch.payload };
  }
};

const factorsInitialState = {
  opened: false,
  sex: false,
  one: false,
  two: false,
  bleeding: "none",
};

const Draw = () => {
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const modelScale = winWidth / 344;
  const canvasHeight = 400 * modelScale;

  const [drawState, setDrawState] = useState(DrawStates.Navigating);
  const [liveStroke, updateLiveStroke] = useReducer(liveStrokeReducer, null);
  const [strokes, updateStrokes] = useReducer(strokesReducer, []);
  const [factors, updateFactors] = useReducer(
    factorsReducer,
    factorsInitialState
  );
  const [keyboard, setKeyboard] = useState(false);

  const saveDay = async () => {
    try {
      const datestampKey = getYYYYMMDD(Date());
      const data = { strokes: strokes, factors: factors };
      const jsonVal = JSON.stringify(data);
      await AsyncStorage.setItem(datestampKey, jsonVal);
    } catch (e) {
      console.log(`Error saving strokes: ${e}`);
    }
  };

  const getDay = async (datestampKey) => {
    try {
      return await AsyncStorage.getItem(datestampKey);
    } catch (e) {
      console.log(`Error retrieving strokes: ${e}`);
    }
  };

  useEffect(() => {
    getDay(getYYYYMMDD(Date())).then((data) => {
      {
        if (data === null) return;
        data.strokes !== undefined &&
          updateStrokes({ do: "set", payload: data.strokes });
        // updateStrokes({ do: "set", payload: data.strokes });
        // updateFactors({ do: "set", payload: data.factors });
      }
    });

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
    <View style={{ flex: 1, marginTop: winHeight * 0.04 }}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={20}
        contentContainerStyle={{
          width: "100%",
          height: "100%",
        }}
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
          factors={factors}
          updateFactors={updateFactors}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Draw;
