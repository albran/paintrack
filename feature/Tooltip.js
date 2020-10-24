import React from "react";
import { StyleSheet, View } from "react-native";

import Tags from "./Tags";
import Scale from "./Scale";
import Pattern from "./Pattern";

const Tooltip = ({ text, liveStroke, setLiveStroke }) => {
  return (
    <View style={styles.container}>
      {/* <Tags /> */}
      {/* <Scale /> */}
      <Pattern setLiveStroke={setLiveStroke} />
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
