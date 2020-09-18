import { Animated, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { PanGestureHandler, State, View } from "react-native-gesture-handler";

import Stroke from "./Stroke";

const Drawer = () => {
  const [path, setPath] = useState();
  const pathRef = useRef([]);

  const onGestureEvent = (event) => {
    pathRef.current.push({
      x: event.nativeEvent.x,
      y: event.nativeEvent.y,
    });
    setPath([...pathRef.current]);
    console.log("(" + event.nativeEvent.x + ", " + event.nativeEvent.y + ")");
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
      <Animated.View style={styles.container}>
        {path && <Stroke path={path} width={375} height={700} />}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "transparent",
  },
  container: {
    position: "absolute",
    width: 375,
    height: 700,
    backgroundColor: "transparent",
  },
});

export default Drawer;
