import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import Svg, { Polyline } from "react-native-svg";

import Stroke from "./Stroke";

const Drawer = () => {
  const defaultStrokeWidth = 50;
  const [livePath, setLivePath] = useState();
  const [strokeWidth, setStrokeWidth] = useState(defaultStrokeWidth);
  const pathRef = useRef([]);
  const baseScaleRef = useRef(new Animated.Value(1));
  const pinchScaleRef = useRef(new Animated.Value(1));
  const scaleRef = useRef(
    Animated.multiply(baseScaleRef.current, pinchScaleRef.current)
  );
  // let lastScale = 1;
  const [paths, setPaths] = useState([]);
  const addPath = (stroke) => {
    setPaths([...paths, stroke]);
  };

  const onPanGestureEvent = (event) => {
    pathRef.current.push({
      x: event.nativeEvent.x,
      y: event.nativeEvent.y,
    });
    setLivePath([...pathRef.current]);
  };

  const onPanHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      pathRef.current = [];
      setLivePath(pathRef.current);
    }

    if (event.nativeEvent.state === State.END) {
      addPath(livePath);
    }
  };

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScaleRef.current } }],
    { useNativeDriver: false }
  );

  const onPinchHandlerStateChange = (event) => {
    // if (event.nativeEvent.oldState === State.ACTIVE) {
    //   lastScale *= event.nativeEvent.scale;
    //   baseScaleRef.current.setValue(lastScale);
    //   pinchScaleRef.current.setValue(1);
    // }
    if (event.nativeEvent.state === State.END) {
      console.log(scaleRef.current.__getValue());
      setStrokeWidth(defaultStrokeWidth * scaleRef.current.__getValue());
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onPanGestureEvent}
      onHandlerStateChange={onPanHandlerStateChange}
    >
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}
      >
        <View style={styles.container}>
          <Svg height="100%" width="100%" viewBox={`0 0 ${375} ${700}`}>
            {paths.map((path, i) => (
              <Stroke key={i} path={path} strokeWidth={strokeWidth} />
            ))}
            {livePath && <Stroke path={livePath} strokeWidth={strokeWidth} />}
          </Svg>
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [
                  {
                    scale: scaleRef.current,
                  },
                ],
              },
            ]}
          />
        </View>
      </PinchGestureHandler>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 700,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  circle: {
    position: "absolute",
    alignSelf: "center",
    top: 50,
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
});

export default Drawer;
