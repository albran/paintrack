import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

const CanvasKeyboardOverlay = ({ keyboard, winWidth, canvasHeight }) => {
  return (
    <TouchableWithoutFeedback
      disabled={!keyboard}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          position: "absolute",
          width: winWidth,
          height: canvasHeight,
          backgroundColor: "whitesmoke",
          opacity: 0.9,
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default CanvasKeyboardOverlay;
