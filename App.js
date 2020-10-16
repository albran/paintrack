import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import Drawer from "./feature/Drawer";

export default function App() {
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  return (
    <View
      style={{
        ...styles.container,
        marginTop: winHeight * 0.04,
      }}
    >
      <Drawer winWidth={winWidth} winHeight={winHeight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
