import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Svg, { Circle } from "react-native-svg";
import Animated from "react-native-reanimated";

import Stroke from "./Stroke";
import ModelFront from "../components/assets/ModelFront";
import ModelBack from "../components/assets/ModelBack";
import { set } from "react-native-reanimated";

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

  const onPinchGestureEvent = Animated.event([
    {
      nativeEvent: {
        scale: (scale) => set(pinchScaleRef.current, scale),
        focalX: (x) => set(circleXRef.current, x),
        focalY: (y) => set(circleYRef.current, y),
      },
    },
  ]);

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
    >
      <Animated.View>
        <PinchGestureHandler
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}
        >
          <Animated.View style={styles.container}>
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
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
});

export default Drawer;
