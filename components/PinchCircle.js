import React, { useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { PinchGestureHandler, State } from "react-native-gesture-handler";

const PinchCircle = () => {
  const baseScaleRef = useRef(new Animated.Value(1));
  const pinchScaleRef = useRef(new Animated.Value(1));
  const scaleRef = useRef(
    Animated.multiply(baseScaleRef.current, pinchScaleRef.current)
  );
  let lastScale = 1;

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScaleRef.current } }],
    { useNativeDriver: true }
  );

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale *= event.nativeEvent.scale;
      baseScaleRef.current.setValue(lastScale);
      pinchScaleRef.current.setValue(1);
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchGestureEvent}
      onHandlerStateChange={onPinchHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleRef.current }],
          },
        ]}
      />
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "red",
    // borderWidth: 1,
  },
});

export default PinchCircle;
