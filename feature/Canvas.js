import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import { State } from "react-native-gesture-handler";
import Svg, { Circle, Rect } from "react-native-svg";
import Animated from "react-native-reanimated";

import TouchableOpacityG from "../components/TouchableOpacityG";
import Stroke from "./Stroke";
import GesturesHandler from "../components/GesturesHandler";
import Model from "../components/assets/Model";
import StrokeRenderer from "./StrokeRenderer";
import { DrawStates } from "../library/globals";

const Canvas = ({
  winWidth,
  liveStroke,
  updateLiveStroke,
  drawState,
  setDrawState,
  strokes,
  updateStrokes,
}) => {
  const modelScale = winWidth / 344;
  const translateX = 0.003 * winWidth;
  const canvasHeight = 400 * modelScale;
  const legendHeight = 15 * modelScale;

  const pathRef = useRef([]);
  const [livePath, setLivePath] = useState();

  const [circleIsVisible, setCircleIsVisible] = useState(false);

  const defaultStrokeWidth = 25;
  const strokeScaleRef = useRef(1);
  const [liveStrokeWidth, setLiveStrokeWidth] = useState(defaultStrokeWidth);

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
      setDrawState(DrawStates.Typing);
      updateLiveStroke({
        do: "init",
        props: {
          path: [...livePath],
          width: liveStrokeWidth,
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
      setLiveStrokeWidth(defaultStrokeWidth * strokeScaleRef.current);
      setCircleIsVisible(false);
      setDrawState(DrawStates.Drawing);
    }
  };

  const onSwipeHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
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
            translateX={translateX}
            modelScale={modelScale}
            depth={depth}
            viewIsFront={viewIsFront}
          />

          <StrokeRenderer
            drawState={drawState}
            setDrawState={setDrawState}
            viewIsFront={viewIsFront}
            depth={depth}
            strokes={strokes}
            updateLiveStroke={updateLiveStroke}
          />

          {(drawState === DrawStates.Viewing ||
            drawState === DrawStates.Reviewing) && (
            <>
              <TouchableOpacityG
              // onPress={() => {
              //   drawState === DrawStates.Reviewing &&
              //     updateStrokes({ do: "append", payload: liveStroke });
              //   updateLiveStroke({ do: "delete" });
              //   setDrawState(DrawStates.Navigating);
              // }}
              >
                <Rect x={0} y={0} width="100%" height="100%" />
              </TouchableOpacityG>
            </>
          )}

          {liveStroke && <Stroke stroke={liveStroke} />}

          {livePath && (
            <Stroke livePath={livePath} liveStrokeWidth={liveStrokeWidth} />
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
          }}
        >
          <Text>{viewIsFront ? "Front" : "Back"}</Text>
          <Text>{["Surface", "Shallow", "Deep"][depth]}</Text>
        </View>
      </View>
    </View>
  );
};

export default Canvas;
