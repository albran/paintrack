import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";

import Stroke from "./Stroke";

const Drawer = () => {
  const [path, setPath] = useState();
  const pathRef = useRef([]);

  const onPanGestureEvent = (event) => {
    pathRef.current.push({
      x: event.nativeEvent.x,
      y: event.nativeEvent.y,
    });
    setPath([...pathRef.current]);
  };

  const onPanHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      pathRef.current = [];
      setPath(pathRef.current);
    }
  };

  const baseScaleRef = useRef(new Animated.Value(1));
  const pinchScaleRef = useRef(new Animated.Value(1));
  const scaleRef = useRef(
    Animated.multiply(baseScaleRef.current, pinchScaleRef.current)
  );
  let lastScale = 1;

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScaleRef.current } }],
    { useNativeDriver: false }
  );

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale *= event.nativeEvent.scale;
      baseScaleRef.current.setValue(lastScale);
      pinchScaleRef.current.setValue(1);
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
          {path && <Stroke path={path} width={375} height={700} />}
          <Animated.View
            style={[
              styles.circle,
              {
                transform: [{ scale: scaleRef.current }],
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
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
});

export default Drawer;
