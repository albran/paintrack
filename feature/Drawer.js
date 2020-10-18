import React, { useRef, useState } from "react";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import Svg, { Circle } from "react-native-svg";
import Animated from "react-native-reanimated";

import TouchableOpacityG from "../components/TouchableOpacityG";
import Stroke from "./Stroke";
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

  const defaultStrokeWidth = 30;
  const strokeScaleRef = useRef(1);
  const [strokeWidth, setStrokeWidth] = useState(defaultStrokeWidth);

  let AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const pinchScaleRef = useRef(new Animated.Value(1));

  const circleXRef = useRef(new Animated.Value(1));
  const circleYRef = useRef(new Animated.Value(1));
  const baseCircleRref = useRef(new Animated.Value(defaultStrokeWidth * 0.5));
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
        scale: (scale) =>
          Animated.block([
            Animated.set(pinchScaleRef.current, scale),
            Animated.call(
              [scale],
              ([scaleListener]) => (strokeScaleRef.current = scaleListener)
            ),
          ]),
        focalX: (x) => Animated.set(circleXRef.current, x),
        focalY: (y) => Animated.set(circleYRef.current, y),
      },
    },
  ]);

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      setCircleIsVisible(true);
    }

    if (event.nativeEvent.state === State.END) {
      setStrokeWidth(defaultStrokeWidth * strokeScaleRef.current);
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
      <Animated.View>
        <PinchGestureHandler
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}
          minPointers={2}
          maxPointers={2}
        >
          <Animated.View>
            <Svg
              width={winWidth}
              height={canvasHeight}
              viewBox={`0 0 ${winWidth} ${canvasHeight}`}
            >
              {/* <ModelFront translateX={translateX} modelScale={modelScale} /> */}
              <ModelBack translateX={translateX} modelScale={modelScale} />
              {livePath && <Stroke path={livePath} strokeWidth={strokeWidth} />}
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
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Drawer;
