import React from "react";
import { StyleSheet, View } from "react-native";

import Tags from "./Tags";

const Tooltip = () => {
  return (
    <View style={styles.container}>
      <Tags />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tooltip;
