import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { DrawStates } from "../library/globals";

const Note = ({ updateLiveStroke, setDrawState, dispatch }) => {
  return (
    <View style={styles.container}>
      <Text>Note</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        textAlignVertical="top"
        placeholder="Leave a note..."
        importantForAutofill="no"
        scrollEnabled={false}
        onEndEditing={(event) => {
          setDrawState(DrawStates.Reviewing);
          updateLiveStroke({ note: event.nativeEvent.text });
          dispatch({ do: "update", payload: { note: event.nativeEvent.text } });
        }}
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
    borderWidth: 1,
  },
  input: {
    width: "95%",
    height: "85%",
  },
});

export default Note;
