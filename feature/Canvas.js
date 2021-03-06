import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import { State } from "react-native-gesture-handler";
import Svg, { Circle, Rect } from "react-native-svg";
import Animated from "react-native-reanimated";

import CanvasKeyboardOverlay from "./CanvasKeyboardOverlay";
import Stroke from "./Stroke";
import GesturesHandler from "./GesturesHandler";
import Model from "./Model";
import StrokesRenderer from "./StrokesRenderer";
import { DrawStates, Constants } from "../library/globals";

const Canvas = ({
  winWidth,
  liveStroke,
  updateLiveStroke,
  drawState,
  setDrawState,
  strokes,
  keyboardIsOpen,
  setKeyboardIsOpen,
}) => {
  const modelScale = winWidth / Constants.modelScaler;
  const translateX = Constants.xScaler * winWidth;
  const canvasHeight = Constants.canvasScaler * modelScale;
  const legendHeight = Constants.legendScaler * modelScale;

  const [viewIsFront, setViewIsFront] = useState(true);
  const [depth, setDepth] = useState(0);

  const pathRef = useRef([]);
  const [livePath, setLivePath] = useState();

  const defaultStrokeWidth = 25;
  const strokeScaleRef = useRef(1);
  const [livePathWidth, setLivePathWidth] = useState(defaultStrokeWidth);

  let AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const [circleIsVisible, setCircleIsVisible] = useState(false);
  const pinchScaleRef = useRef(new Animated.Value(1));
  const circleXRef = useRef(new Animated.Value(1));
  const circleYRef = useRef(new Animated.Value(1));
  const baseCircleRref = useRef(new Animated.Value(defaultStrokeWidth * 0.5));
  const circleRref = Animated.multiply(
    baseCircleRref.current,
    pinchScaleRef.current
  );

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
      setDrawState(DrawStates.Typing);
      updateLiveStroke({
        do: "init",
        props: {
          path: [...livePath],
          width: livePathWidth,
          view: viewIsFront ? "front" : "back",
          depth: depth,
        },
      });
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
      setLivePathWidth(defaultStrokeWidth * strokeScaleRef.current);
      setCircleIsVisible(false);
      setDrawState(DrawStates.Drawing);
    }
  };

  const onSwipeHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      //workaround for android
      const { translationX, translationY } = event.nativeEvent;
      const minPanVal = 20;
      const belowPanThreshold =
        Math.abs(translationX) < minPanVal &&
        Math.abs(translationY) < minPanVal;
      if (belowPanThreshold) return;

      setViewIsFront(!viewIsFront);
      setDepth(0);
    }
  };

  const onTapHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      setDepth((depth + 1) % 3);
    }
  };

  return (
    <View>
      <View>
        <GesturesHandler
          drawState={drawState}
          onTapHandlerStateChange={onTapHandlerStateChange}
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
            <Model
              drawState={drawState}
              translateX={translateX}
              modelScale={modelScale}
              depth={depth}
              viewIsFront={viewIsFront}
            />

            <StrokesRenderer
              drawState={drawState}
              setDrawState={setDrawState}
              viewIsFront={viewIsFront}
              depth={depth}
              strokes={strokes}
              updateLiveStroke={updateLiveStroke}
            />

            {liveStroke && <Stroke stroke={liveStroke} />}

            {livePath && (
              <Stroke livePath={livePath} livePathWidth={livePathWidth} />
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

            {drawState === DrawStates.Factoring && (
              <Rect
                width={winWidth}
                height={canvasHeight}
                fill="whitesmoke"
                opacity={0.9}
              />
            )}
          </Svg>
        </GesturesHandler>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: legendHeight,
          }}
        >
          <View
            style={{
              width: "50%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: drawState === DrawStates.Factoring ? 0.1 : 1,
            }}
          >
            <Text>{viewIsFront ? "Front" : "Back"}</Text>
            <Text>{["Surface", "Shallow", "Deep"][depth]}</Text>
          </View>
        </View>
      </View>
      {keyboardIsOpen && (
        <CanvasKeyboardOverlay
          winWidth={winWidth}
          canvasHeight={canvasHeight + legendHeight}
          setDrawState={setDrawState}
          setKeyboardIsOpen={setKeyboardIsOpen}
        />
      )}
    </View>
  );
};

export default Canvas;
