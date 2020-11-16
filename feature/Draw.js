import React, { useEffect, useReducer, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import Canvas from "./Canvas";
import CanvasKeyboardOverlay from "./CanvasKeyboardOverlay";
import Tooltip from "./Tooltip";
import { DrawStates } from "../library/globals";
import KeyboardViewHandler from "./KeyboardViewHandler";
import {
  liveStrokeReducer,
  strokesReducer,
  factorsReducer,
  factorsInitialState,
} from "../library/reducers";

const Draw = ({ date }) => {
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const modelScale = winWidth / 344;
  const canvasHeight = 400 * modelScale;

  const [keyboard, setKeyboard] = useState(false);
  const [drawState, setDrawState] = useState(DrawStates.Navigating);
  const [liveStroke, updateLiveStroke] = useReducer(liveStrokeReducer, null);
  const [strokes, updateStrokes] = useReducer(strokesReducer, []);
  const [factors, updateFactors] = useReducer(
    factorsReducer,
    factorsInitialState
  );

  const saveStroke = async () => {
    try {
      const dateKey = date;
      const data = { strokes: [...strokes, { ...liveStroke }] };
      await AsyncStorage.mergeItem(dateKey, JSON.stringify(data));
      updateStrokes({ do: "append", payload: { ...liveStroke } });
    } catch (e) {
      console.log(`Error saving stroke array ${e}`);
    }
  };

  const deleteStroke = async (i) => {
    try {
      const dateKey = date;
      const data = { strokes: strokes.filter((val, j) => i !== j) };
      await AsyncStorage.setItem(dateKey, JSON.stringify(data));
      updateStrokes({ do: "set", payload: data.strokes });
    } catch (e) {
      console.log(`Error deleting stroke ${e}`);
    }
  };

  const saveFactors = async () => {
    const dateKey = date;
    const data = { factors: { ...factors } };
    await AsyncStorage.mergeItem(dateKey, JSON.stringify(data));
  };

  const getDay = async () => {
    try {
      const dateKey = date;
      const jsonVal = await AsyncStorage.getItem(dateKey);
      return jsonVal != null ? JSON.parse(jsonVal) : null;
    } catch (e) {
      console.log(`Error retrieving date for date: ${e}`);
    }
  };

  useEffect(() => {
    getDay().then((data) => {
      {
        if (data === null) {
          updateStrokes({ do: "set", payload: [] });
          updateFactors({ do: "set", payload: factorsInitialState });
          return;
        }
        data.strokes && updateStrokes({ do: "set", payload: data.strokes });
        data.factors && updateFactors({ do: "set", payload: data.factors });
      }
    });
  }, [date]);

  return (
    <View style={{ flex: 1, marginTop: winHeight * 0.04 }}>
      <KeyboardViewHandler setKeyboard={setKeyboard}>
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
          factors={factors}
          updateFactors={updateFactors}
          saveStroke={saveStroke}
          deleteStroke={deleteStroke}
          saveFactors={saveFactors}
        />
      </KeyboardViewHandler>
    </View>
  );
};

export default React.memo(Draw);
