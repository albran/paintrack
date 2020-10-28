import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

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
          updateLiveStroke({ note: event.nativeEvent.text });
          saveStroke();
          setDrawState("VIEWING");
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
