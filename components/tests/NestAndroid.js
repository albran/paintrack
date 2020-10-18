import React from "react";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const NestAndroid = () => {
  const onPanGestureEvent = null;
  //   (event) => console.log("pan gesture event");
  const onPinchGestureEvent = null;
  //   (event) => console.log("pinch gesture event");
  const onPanHandlerStateChange = (event) => console.log("pan gesture state");
  const onPinchHandlerStateChange = (event) =>
    console.log("pinch gesture state");
  return (
    <PanGestureHandler
      //   onGestureEvent={onPanGestureEvent}
      onHandlerStateChange={onPanHandlerStateChange}
      minPointers={1}
      maxPointers={1}
    >
      <Animated.View>
        <PinchGestureHandler
          //   onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}
          minPointers={2}
          maxPointers={2}
        >
          <Animated.View style={{ width: "100%", height: "100%" }} />
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default NestAndroid;
