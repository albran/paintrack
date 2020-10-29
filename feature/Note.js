import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { DrawStates } from "../library/globals";

const Note = ({ updateLiveStroke, setDrawState, saveStroke }) => {
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
          const noteText = event.nativeEvent.text.slice();
          updateLiveStroke({ note: noteText });
          saveStroke();
          setDrawState(DrawStates.Navigating);
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
