import { Animated, Dimensions, StyleSheet } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import React, { useRef, useState } from "react";
import {
  LongPressGestureHandler,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

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
        stroke="white"
        strokeWidth={45}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const PGCanvas = () => {
  const [path, setPath] = useState();
  const pathRef = useRef([]);

  const onGestureEvent = (event) => {
    pathRef.current.push({
      x: event.nativeEvent.x,
      y: event.nativeEvent.y,
    });
    setPath([...pathRef.current]);
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      pathRef.current = [];
      setPath(pathRef.current);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      minDist={0}
    >
      <Animated.View style={StyleSheet.absoluteFill}>
        {path && <GesturePath path={path} />}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default PGCanvas;
