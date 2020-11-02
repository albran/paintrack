import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { DrawStates } from "../library/globals";

const Navigation = ({ setDrawState }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setDrawState(DrawStates.Pinching);
        }}
        style={styles.drawButton}
      >
        <Text>Draw</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawButton}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  drawButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: "20%",
    borderRadius: 20,
    backgroundColor: "pink",
  },
});

export default Navigation;
