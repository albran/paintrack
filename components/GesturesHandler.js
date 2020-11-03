import React from "react";
import { View } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { DrawStates } from "../library/globals";

const GesturesHandler = ({
  children,
  drawState,
  onTapHandlerStateChange,
  onSwipeHandlerStateChange,
  onDrawGestureEvent,
  onDrawHandlerStateChange,
  onPinchGestureEvent,
  onPinchHandlerStateChange,
}) => {
  if (drawState === DrawStates.Navigating)
    return (
      <TapGestureHandler
        minPointers={1}
        maxPointers={1}
        maxDist={1}
        onHandlerStateChange={onTapHandlerStateChange}
      >
        <Animated.View>
          <PanGestureHandler
            minPointers={1}
            maxPointers={1}
            minDist={100}
            onHandlerStateChange={onSwipeHandlerStateChange}
          >
            <Animated.View>{children}</Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    );

  if (drawState === DrawStates.Pinching)
    return (
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}
        minPointers={2}
        maxPointers={2}
      >
        <Animated.View>{children}</Animated.View>
      </PinchGestureHandler>
    );

  if (drawState === DrawStates.Drawing)
    return (
      <PanGestureHandler
        onGestureEvent={onDrawGestureEvent}
        onHandlerStateChange={onDrawHandlerStateChange}
        minPointers={1}
        maxPointers={1}
      >
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    );
  else return <View>{children}</View>;
};

export default GesturesHandler;
