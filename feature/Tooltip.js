import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Tags from "./Tags";
import Scale from "./Scale";
import Pattern from "./Pattern";

const Tooltip = ({ liveStroke, updateLiveStroke, drawState, setDrawState }) => {
  return (
    <View style={styles.container}>
      {drawState === "PINCHING" && <Text>Pinch to adjust stroke size</Text>}
      {drawState === "DRAWING" && (
        <Text>Draw an area of pain using your finger.</Text>
      )}
      {drawState === "TYPING" && (
        <Tags updateLiveStroke={updateLiveStroke} setDrawState={setDrawState} />
      )}
      {drawState === "SCALING" && (
        <Scale
          liveStroke={liveStroke}
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
        />
      )}
      {drawState === "PATTERNING" && (
        <Pattern
          liveStroke={liveStroke}
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
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
