import React, { useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

export default function MovingBall() {
  const translateXref = useRef(new Animated.Value(0));
  const translateYref = useRef(new Animated.Value(0));
  const lastOffsetRef = useRef({ x: 0, y: 0 });

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateXref.current,
          translationY: translateYref.current,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastOffsetRef.current.x += event.nativeEvent.translationX;
      lastOffsetRef.current.y += event.nativeEvent.translationY;
      translateXref.current.setOffset(lastOffsetRef.current.x);
      translateXref.current.setValue(0);
      translateYref.current.setOffset(lastOffsetRef.current.y);
      translateYref.current.setValue(0);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.ball,
          {
            transform: [
              {
                translateX: translateXref.current,
                translateY: translateYref.current,
              },
            ],
          },
        ]}
      />
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "transparent",
    borderWidth: 1,
  },
});
