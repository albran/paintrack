import React from "react";
import {
  PanGestureHandler,
  PinchGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const GesturesHandler = ({
  children,
  onTwoFingerTapHandlerStateChange,
  onSwipeHandlerStateChange,
  onDrawGestureEvent,
  onDrawHandlerStateChange,
  onPinchGestureEvent,
  onPinchHandlerStateChange,
}) => {
  return (
    <TapGestureHandler
      minPointers={2}
      maxPointers={2}
      onHandlerStateChange={onTwoFingerTapHandlerStateChange}
    >
      <Animated.View>
        <PanGestureHandler
          minPointers={2}
          maxPointers={2}
          onHandlerStateChange={onSwipeHandlerStateChange}
        >
          <Animated.View>
            <PanGestureHandler
              onGestureEvent={onDrawGestureEvent}
              onHandlerStateChange={onDrawHandlerStateChange}
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
                  <Animated.View>{children}</Animated.View>
                </PinchGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default GesturesHandler;
