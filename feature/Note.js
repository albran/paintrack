import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { DrawStates } from "../library/globals";

const Note = ({ updateLiveStroke, setDrawState, setKeyboardIsOpen }) => {
  const onFocus = () => setKeyboardIsOpen(true);
  const onEndEditing = (event) => {
    setDrawState(DrawStates.Reviewing);
    updateLiveStroke({
      do: "append",
      props: { note: event.nativeEvent.text },
    });
  };

  return (
    <View style={styles.container}>
      <Text>Note</Text>
      <TextInput
        onFocus={onFocus}
        style={styles.input}
        multiline={true}
        textAlignVertical="top"
        placeholder="Leave a note..."
        importantForAutofill="no"
        scrollEnabled={false}
        onEndEditing={(event) => onEndEditing(event)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  input: {
    width: "95%",
    height: "85%",
  },
});

export default Note;
