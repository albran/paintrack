import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Note = () => {
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: "85%",
    borderWidth: 1,
  },
  input: {
    flex: 1,
    width: "95%",
    backgroundColor: "pink",
  },
});

export default Note;
