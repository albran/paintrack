import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import RadioButton from "./RadioButton";
import colorFromStroke from "../library/colorFromStroke";

const generateButtons = (
  selection,
  setSelection,
  liveStroke,
  updateLiveStroke,
  setDrawState
) => {
  const buttons = [];
  for (let i = 1, j = 10; i <= 10; i++, j--) {
    buttons.unshift(
      <RadioButton
        key={i}
        number={j}
        color={colorFromStroke(liveStroke.type, j)}
        selection={selection}
        setSelection={setSelection}
        updateLiveStroke={updateLiveStroke}
        setDrawState={setDrawState}
      />
    );
  }
  return buttons;
};

const Scale = ({ liveStroke, updateLiveStroke, setDrawState }) => {
  const minColor = colorFromStroke(liveStroke.type, 1);
  const maxColor = colorFromStroke(liveStroke.type, 10);
  const [selection, setSelection] = useState(1);
  const buttons = generateButtons(
    selection,
    setSelection,
    liveStroke,
    updateLiveStroke,
    setDrawState
  );
  return (
    <View style={styles.container}>
      <View style={styles.barWrapper}>
        <LinearGradient
          colors={[minColor, maxColor]}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={styles.bar}
        />
      </View>
      {buttons}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "97%",
  },
  barWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bar: {
    height: 15,
    width: "90%",
    backgroundColor: "pink",
  },
});

export default Scale;
