import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Tags from "./Tags";
import Scale from "./Scale";
import Pattern from "./Pattern";
import Note from "./Note";
import DrawButton from "./DrawButton";

import { DrawStates } from "./globals";

const Tooltip = ({
  liveStroke,
  updateLiveStroke,
  drawState,
  setDrawState,
  saveStroke,
}) => {
  return (
    <View style={styles.container}>
      {drawState === DrawStates.Navigating && (
        <DrawButton setDrawState={setDrawState} />
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
        <Note
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
          saveStroke={saveStroke}
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
