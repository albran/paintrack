import React from "react";
import { StyleSheet, View } from "react-native";

import Tags from "./Tags";
import Scale from "./Scale";

const Tooltip = () => {
  return (
    <View style={styles.container}>
      {/* <Tags /> */}
      <Scale />
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
