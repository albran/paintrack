import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DrawStates } from "../library/globals";

const DrawButton = ({ setDrawState }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setDrawState(DrawStates.Pinching);
      }}
      style={styles.container}
    >
      <Text>Draw</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "85%",
    borderRadius: 20,
    backgroundColor: "pink",
  },
});

export default DrawButton;
