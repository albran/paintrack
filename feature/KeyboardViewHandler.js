import React, { useEffect } from "react";
import { Keyboard, KeyboardAvoidingView } from "react-native";

const KeyboardViewHandler = ({ children, setKeyboard }) => {
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
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={20}
      contentContainerStyle={{
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardViewHandler;
