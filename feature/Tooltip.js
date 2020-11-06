import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Tags from "./Tags";
import Scale from "./Scale";
import Pattern from "./Pattern";
import Note from "./Note";

import { DrawStates } from "../library/globals";
import StrokeInfo from "./StrokeInfo";
import Navigation from "./Navigation";
import Factors from "./Factors";

const Tooltip = ({
  liveStroke,
  updateLiveStroke,
  drawState,
  setDrawState,
  updateStrokes,
  saveDay,
  factors,
  updateFactors,
}) => {
  return (
    <View style={styles.container}>
      {drawState === DrawStates.Navigating && (
        <Navigation setDrawState={setDrawState} saveDay={saveDay} />
      )}
      {drawState === DrawStates.Factoring && (
        <Factors
          setDrawState={setDrawState}
          factors={factors}
          updateFactors={updateFactors}
          saveDay={saveDay}
        />
      )}
      {drawState === DrawStates.Pinching && (
        <Text>Pinch to adjust stroke size</Text>
      )}
      {drawState === DrawStates.Drawing && (
        <Text>Draw an area of pain using your finger.</Text>
      )}
      {drawState === DrawStates.Typing && (
        <Tags updateLiveStroke={updateLiveStroke} setDrawState={setDrawState} />
      )}
      {drawState === DrawStates.Scaling && (
        <Scale
          liveStroke={liveStroke}
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
        />
      )}
      {drawState === DrawStates.Patterning && (
        <Pattern
          liveStroke={liveStroke}
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
        />
      )}
      {drawState === DrawStates.Noting && (
        <Note updateLiveStroke={updateLiveStroke} setDrawState={setDrawState} />
      )}
      {(drawState === DrawStates.Reviewing ||
        drawState === DrawStates.Viewing) && (
        <StrokeInfo
          stroke={liveStroke}
          drawState={drawState}
          setDrawState={setDrawState}
          liveStroke={liveStroke}
          updateLiveStroke={updateLiveStroke}
          updateStrokes={updateStrokes}
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
