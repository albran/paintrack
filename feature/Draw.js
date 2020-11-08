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

const Draw = ({ date }) => {
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

  const saveStroke = async () => {
    try {
      const datestampKey = getYYYYMMDD(Date());
      const data = { strokes: [...strokes, { ...liveStroke }] };
      await AsyncStorage.mergeItem(datestampKey, JSON.stringify(data));
      updateStrokes({ do: "append", payload: { ...liveStroke } });
    } catch (e) {
      console.log(`Error saving stroke array ${e}`);
    }
  };

  const deleteStroke = async (i) => {
    try {
      const datestampKey = getYYYYMMDD(Date());
      const data = { strokes: strokes.filter((val, j) => i !== j) };
      await AsyncStorage.setItem(datestampKey, JSON.stringify(data));
      updateStrokes({ do: "set", payload: data.strokes });
    } catch (e) {
      console.log(`Error deleting stroke ${e}`);
    }
  };

  const saveFactors = async () => {
    const datestampKey = getYYYYMMDD(Date());
    const data = { factors: { ...factors } };
    await AsyncStorage.mergeItem(datestampKey, JSON.stringify(data));
  };

  const getDay = async (datestampKey) => {
    try {
      const jsonData = await AsyncStorage.getItem(datestampKey);
      return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (e) {
      console.log(`Error retrieving strokes: ${e}`);
    }
  };

  useEffect(() => {
    getDay(getYYYYMMDD(Date())).then((data) => {
      {
        if (data === null) return;
        data.strokes && updateStrokes({ do: "set", payload: data.strokes });
        data.factors && updateFactors({ do: "set", payload: data.factors });
      }
    });
  }, []);

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
          factors={factors}
          updateFactors={updateFactors}
          saveStroke={saveStroke}
          deleteStroke={deleteStroke}
          saveFactors={saveFactors}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default React.memo(Draw);
