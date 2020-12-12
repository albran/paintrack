import React from "react";
import { Pressable, Keyboard } from "react-native";

const CanvasKeyboardOverlay = ({
  winWidth,
  canvasHeight,
  setKeyboardIsOpen,
}) => {
  return (
    <Pressable
      onPress={() => {
        Keyboard.dismiss();
        setKeyboardIsOpen(false);
      }}
      style={{
        position: "absolute",
        width: winWidth,
        height: canvasHeight,
        backgroundColor: "whitesmoke",
        opacity: 0.9,
      }}
    />
  );
};

export default CanvasKeyboardOverlay;
