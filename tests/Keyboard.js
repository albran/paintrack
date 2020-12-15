import React from "react";
import { KeyboardAvoidingView, TextInput } from "react-native";

const Keyboard = () => {
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={20}
      contentContainerStyle={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextInput
        //onFocus={onFocus}
        style={{ width: 300, height: 400 }}
        multiline={true}
        textAlignVertical="top"
        placeholder="Leave a note..."
        importantForAutofill="no"
        //scrollEnabled={false}
        //onEndEditing={(event) => onEndEditing(event)}
      />
    </KeyboardAvoidingView>
  );
};

export default Keyboard;
