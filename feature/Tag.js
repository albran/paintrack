import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

const Tag = ({ text }) => {
  const height = useWindowDimensions().height;
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 17,
    margin: 5,
  },
  text: {
    fontSize: 24,
    marginHorizontal: 9,
    marginVertical: 3,
  },
});

export default Tag;
