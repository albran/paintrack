import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Svg, { Circle, G, Path } from "react-native-svg";
import * as Device from "expo-device";

import Stroke from "./Stroke";
import TouchableOpacityG from "../components/TouchableOpacityG";
import ModelFront from "../components/assets/ModelFront";

const Drawer = ({ winWidth, winHeight }) => {
  const modelScale = winWidth / 102;
  const canvasHeight = 118 * modelScale;
  const phoneModel = Device.modelName;
  console.log(`${phoneModel} scale: ${modelScale}`);
  console.log(`canvas w:${winWidth}, h:${canvasHeight}`);
  const defaultStrokeWidth = 50;
  const [livePath, setLivePath] = useState();
  const [strokeWidth, setStrokeWidth] = useState(defaultStrokeWidth);
  const pathRef = useRef([]);
  const baseScaleRef = useRef(new Animated.Value(1));
  const pinchScaleRef = useRef(new Animated.Value(1));
  const circleXRef = useRef(new Animated.Value(1));
  const circleYRef = useRef(new Animated.Value(1));
  const scaleRef = useRef(
    Animated.multiply(baseScaleRef.current, pinchScaleRef.current)
  );
  // let lastScale = 1;
  const strokePathsRef = useRef([]);
  const strokeWidthsRef = useRef([]);
  const [circleIsVisible, setCircleIsVisible] = useState(false);

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
      strokePathsRef.current.push(livePath);
      strokeWidthsRef.current.push(strokeWidth);
      setLivePath([]);
    }
  };

  const onPinchGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          scale: pinchScaleRef.current,
          focalX: circleXRef.current,
          focalY: circleYRef.current,
        },
      },
    ],
    { useNativeDriver: false }
  );

  const onPinchHandlerStateChange = (event) => {
    // if (event.nativeEvent.oldState === State.ACTIVE) {
    //   lastScale *= event.nativeEvent.scale;
    //   baseScaleRef.current.setValue(lastScale);
    //   pinchScaleRef.current.setValue(1);
    // }

    if (event.nativeEvent.state === State.BEGAN) {
      setCircleIsVisible(true);
    }

    if (event.nativeEvent.state === State.END) {
      setStrokeWidth(defaultStrokeWidth * scaleRef.current.__getValue());
      setCircleIsVisible(false);
    }
  };
  return (
    <PanGestureHandler
      onGestureEvent={onPanGestureEvent}
      onHandlerStateChange={onPanHandlerStateChange}
      minPointers={1}
      maxPointers={1}
    >
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}
        minPointers={2}
        maxPointers={2}
      >
        <View
          style={{
            ...styles.container,
            // width: canvasWidth,
            // height: canvasHeight,
          }}
        >
          <Svg
            width={winWidth}
            height={canvasHeight}
            viewBox={`0 0 ${winWidth} ${canvasHeight}`}
          >
            <ModelFront modelScale={modelScale} />

            {strokePathsRef.current.map((path, i) => (
              <TouchableOpacityG key={i}>
                <Stroke
                  key={i}
                  path={path}
                  strokeWidth={strokeWidthsRef.current[i]}
                />
              </TouchableOpacityG>
            ))}
            {livePath && <Stroke path={livePath} strokeWidth={strokeWidth} />}
          </Svg>
          {circleIsVisible && (
            <Animated.View
              style={[
                {
                  ...styles.circle,
                  left: circleXRef.current,
                  top: circleYRef.current,
                },
                {
                  transform: [
                    {
                      scale: scaleRef.current,
                    },
                  ],
                },
              ]}
            />
          )}
        </View>
      </PinchGestureHandler>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  circle: {
    position: "absolute",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
});

export default Drawer;
