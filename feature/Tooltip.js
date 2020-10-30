import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Tags from "./Tags";
import Scale from "./Scale";
import Pattern from "./Pattern";
import Note from "./Note";
import DrawButton from "./DrawButton";

import { DrawStates } from "../library/globals";
import StrokeInfo from "./StrokeInfo";

const Tooltip = ({
  liveStroke,
  setLiveStroke,
  updateLiveStroke,
  drawState,
  setDrawState,
  saveStroke,
  infoStroke,
  lsstate,
  dispatch,
}) => {
  return (
    <View style={styles.container}>
      {drawState === DrawStates.Navigating && (
        <DrawButton setDrawState={setDrawState} />
      )}
      {drawState === DrawStates.Viewing && (
        <StrokeInfo stroke={infoStroke} setDrawState={setDrawState} />
      )}
      {drawState === DrawStates.Pinching && (
        <Text>Pinch to adjust stroke size</Text>
      )}
      {drawState === DrawStates.Drawing && (
        <Text>Draw an area of pain using your finger.</Text>
      )}
      {drawState === DrawStates.Typing && (
        <Tags
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
          lsstate={lsstate}
          dispatch={dispatch}
        />
      )}
      {drawState === DrawStates.Scaling && (
        <Scale
          liveStroke={liveStroke}
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
          lsstate={lsstate}
          dispatch={dispatch}
        />
      )}
      {drawState === DrawStates.Patterning && (
        <Pattern
          liveStroke={liveStroke}
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
          lsstate={lsstate}
          dispatch={dispatch}
        />
      )}
      {drawState === DrawStates.Noting && (
        <Note
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
          dispatch={dispatch}
        />
      )}
      {drawState === DrawStates.Reviewing && (
        <StrokeInfo
          stroke={liveStroke}
          setLiveStroke={setLiveStroke}
          setDrawState={setDrawState}
          dispatch={dispatch}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tooltip;
