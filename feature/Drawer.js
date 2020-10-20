import React, { useRef, useState } from "react";
import { State } from "react-native-gesture-handler";
import Svg, { Circle } from "react-native-svg";
import Animated from "react-native-reanimated";

import TouchableOpacityG from "../components/TouchableOpacityG";
import Stroke from "./Stroke";
import ModelFront from "../components/assets/ModelFront";
import ModelBack from "../components/assets/ModelBack";
import GesturesHandler from "../components/GesturesHandler";

const Drawer = ({ winWidth, winHeight }) => {
  const modelScale = winWidth / 344;
  const translateX = 0.003 * winWidth;
  const canvasHeight = 400 * modelScale;

  const pathRef = useRef([]);
  const [livePath, setLivePath] = useState();

  const strokePathsRef = useRef([]);
  const strokeWidthsRef = useRef([]);
  const [circleIsVisible, setCircleIsVisible] = useState(false);

  const defaultStrokeWidth = 25;
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

  const [viewIsFront, setViewIsFront] = useState(true);
  const [depth, setDepth] = useState(0);

  const onDrawGestureEvent = (event) => {
    pathRef.current.push({
      x: event.nativeEvent.x,
      y: event.nativeEvent.y,
    });
    setLivePath([...pathRef.current]);
  };

  const onDrawHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      pathRef.current = [];
      setLivePath(pathRef.current);
    }

    if (event.nativeEvent.state === State.END) {
      strokePathsRef.current.push(livePath);
      strokeWidthsRef.current.push(strokeWidth);
      setLivePath([]);
      setCircleIsVisible(false);
    }
  };

  const onPinchGestureEvent = Animated.event([
    {
      nativeEvent: {
        scale: (scale) =>
          Animated.block([
            Animated.set(pinchScaleRef.current, scale),
            Animated.call([scale], ([scaleListener]) => {
              strokeScaleRef.current = scaleListener;
            }),
          ]),
        focalX: (x) => Animated.set(circleXRef.current, x),
        focalY: (y) => Animated.set(circleYRef.current, y),
      },
    },
  ]);

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setCircleIsVisible(true);
    }

    if (event.nativeEvent.state === State.END) {
      setStrokeWidth(defaultStrokeWidth * strokeScaleRef.current);
      setCircleIsVisible(false);
    }
  };

  const onSwipeHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      setViewIsFront(!viewIsFront);
      setDepth(0);
    }
  };

  const onTwoFingerTapHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      setDepth((depth + 1) % 3);
    }
  };

  return (
    <GesturesHandler
      onTwoFingerTapHandlerStateChange={onTwoFingerTapHandlerStateChange}
      onSwipeHandlerStateChange={onSwipeHandlerStateChange}
      onDrawGestureEvent={onDrawGestureEvent}
      onDrawHandlerStateChange={onDrawHandlerStateChange}
      onPinchGestureEvent={onPinchGestureEvent}
      onPinchHandlerStateChange={onPinchHandlerStateChange}
    >
      <Svg
        width={winWidth}
        height={canvasHeight}
        viewBox={`0 0 ${winWidth} ${canvasHeight}`}
      >
        {viewIsFront && (
          <ModelFront
            translateX={translateX}
            modelScale={modelScale}
            depth={depth}
          />
        )}
        {!viewIsFront && (
          <ModelBack
            translateX={translateX}
            modelScale={modelScale}
            depth={depth}
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
      </Svg>
    </GesturesHandler>
  );
};

export default Drawer;
