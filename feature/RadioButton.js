import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const RadioButton = ({
  color,
  number,
  selection,
  setSelection,
  updateLiveStroke,
  setDrawState,
}) => {
  return (
    <View style={styles.container}>
      {selection === number && (
        <View style={styles.dialContainer}>
          <View style={{ ...styles.dialBlob, backgroundColor: color }} />
          <View style={{ ...styles.dialBlob, backgroundColor: color }} />
        </View>
      )}
      <Pressable
        style={{ ...styles.touchable, backgroundColor: color }}
        onPressIn={() => setSelection(number)}
        onPressOut={() => {
          updateLiveStroke({ scale: number });
          setDrawState("PATTERNING");
        }}
      >
        <Text style={styles.number}>{number}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 120,
  },
  dialContainer: {
    position: "absolute",
    justifyContent: "space-between",
    width: "25%",
    height: "90%",
  },
  dialBlob: {
    width: "100%",
    height: "30%",
    borderRadius: 10,
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  number: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});

export default RadioButton;
