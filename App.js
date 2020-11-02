import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import Draw from "./feature/Draw";
import Calendar from "./feature/Calendar";

export default function App() {
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  return (
    <View
      style={{
        ...styles.container,
        marginTop: winHeight * 0.04,
      }}
    >
      <Draw winWidth={winWidth} winHeight={winHeight} />
      {/* <Calendar winWidth={winWidth} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
