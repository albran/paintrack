import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Svg, { Circle } from "react-native-svg";
import Reanimated from "react-native-reanimated";

import Stroke from "./Stroke";
import TouchableOpacityG from "../components/TouchableOpacityG";
import ModelFront from "../components/assets/ModelFront";
import ModelBack from "../components/assets/ModelBack";

const Drawer = ({ winWidth, winHeight }) => {
  const modelScale = winWidth / 344;
  const translateX = 0.003 * winWidth;
  const canvasHeight = 400 * modelScale;

  const pathRef = useRef([]);
  const [livePath, setLivePath] = useState();

  const strokePathsRef = useRef([]);
  const strokeWidthsRef = useRef([]);
  const [circleIsVisible, setCircleIsVisible] = useState(false);

  const defaultStrokeWidth = 50;
  const [strokeWidth, setStrokeWidth] = useState(defaultStrokeWidth);

  let AnimatedCircle = Animated.createAnimatedComponent(Circle);
  // let AnimatedCircle = Reanimated.createAnimatedComponent(Circle);

  const pinchScaleRef = useRef(new Animated.Value(1));

  const circleXRef = useRef(new Animated.Value(1));
  const circleYRef = useRef(new Animated.Value(1));
  const baseCircleRref = useRef(new Animated.Value(20));
  const circleRref = Animated.multiply(
    baseCircleRref.current,
    pinchScaleRef.current
  );

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

  // const onPinchGestureEvent = (event) => {
  //   console.log(event.nativeEvent);
  // };

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
      // setStrokeWidth(defaultStrokeWidth * scaleRef.current.__getValue());
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
          }}
        >
          <Svg
            width={winWidth}
            height={canvasHeight}
            viewBox={`0 0 ${winWidth} ${canvasHeight}`}
          >
            {/* <ModelFront translateX={translateX} modelScale={modelScale} /> */}
            <ModelBack translateX={translateX} modelScale={modelScale} />
            {livePath && (
              <Stroke path={livePath} strokeWidth={80 * modelScale} />
            )}
            {circleIsVisible && (
              <AnimatedCircle
                stroke="black"
                strokeWidth={1}
                fill="transparent"
                cx={circleXRef.current}
                cy={circleYRef.current}
                r={circleRref}
              />
            )}
            {/* {strokePathsRef.current.map((path, i) => (
              <TouchableOpacityG key={i}>
                <Stroke
                  key={i}
                  path={path}
                  strokeWidth={strokeWidthsRef.current[i]}
                />
              </TouchableOpacityG>
            ))}
            {livePath && <Stroke path={livePath} strokeWidth={strokeWidth} />} */}
          </Svg>
          {/* {circleIsVisible && (
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
          )} */}
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
