import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const Tag = ({ text, color }) => {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.container, backgroundColor: color }}>
        <Text style={{ ...styles.text }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
    margin: 5,
  },
  text: {
    fontSize: 24,
    color: "white",
    marginHorizontal: 9,
    marginVertical: 3,
  },
});

export default Tag;
