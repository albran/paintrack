import React, { useRef, useState } from "react";
import { Dimensions, PanResponder, View, StyleSheet } from "react-native";
import Svg, { Polyline } from "react-native-svg";

const examplePath = [
  { x: 90, y: 300 },
  { x: 170, y: 45 },
  { x: 250, y: 290 },
  { x: 45, y: 130 },
  { x: 285, y: 130 },
  { x: 90, y: 298 },
];

const GesturePath = ({ path }) => {
  const { width, height } = Dimensions.get("window");
  const points = path.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
      <Polyline
        points={points}
        fill="transparent"
        stroke="black"
        strokeWidth={50}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points={points}
        fill="transparent"
        stroke="whitesmoke"
        strokeWidth={45}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const GestureRecorder = ({ onPathChanged }) => {
  const pathRef = useRef([]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pathRef.current = [];
      },
      onPanResponderMove: (event) => {
        console.log(event);
        console.log("hello");
        pathRef.current.push({
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY,
        });
        // Uncomment the next line to draw the path as the user is performing the touch. (A new array must be created so setState recognises the change and re-renders the App)
        onPathChanged([...pathRef.current]);
      },
      onPanResponderRelease: () => {
        onPathChanged([...pathRef.current]);
      },
    })
  ).current;

  return (
    <View
      style={{ ...StyleSheet.absoluteFill, flex: 1 }}
      {...panResponder.panHandlers}
    />
  );
};

const Canvas = () => {
  const [path, setPath] = useState();
  return (
    <View style={{ ...StyleSheet.absoluteFill, flex: 1 }}>
      {path && <GesturePath path={path} />}
      <GestureRecorder onPathChanged={setPath} />
    </View>
  );
};

export default Canvas;
