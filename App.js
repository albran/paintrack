import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

import MovingBall from "./components/MovingBall";
import PGCanvas from "./components/PGCanvas";
import PinchCircle from "./components/PinchCircle";
import Canvas from "./feature/Canvas";
import Drawer from "./feature/Drawer";
import StackSVG from "./components/StackSVG";
import CircleTranform from "./components/CircleTranform";
import Strokes from "./components/Strokes";

export default function App() {
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  // console.log(`window w: ${winWidth}, h: ${winHeight}`);
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
