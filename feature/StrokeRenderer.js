import React from "react";
import TouchableOpacityG from "../components/TouchableOpacityG";
import Stroke from "./Stroke";

import { DrawStates } from "../library/globals";

const StrokeRenderer = ({
  drawState,
  setDrawState,
  viewIsFront,
  depth,
  strokes,
  updateLiveStroke,
}) => {
  const view = viewIsFront ? "front" : "back";
  if (drawState === DrawStates.Navigating)
    return (
      <>
        {strokes.map(
          (stroke, i) =>
            depth === stroke.depth &&
            view === stroke.view && (
              <TouchableOpacityG
                key={i}
                onPress={() => {
                  setDrawState(DrawStates.Reviewing);
                  updateLiveStroke({ do: "set", props: { ...stroke, i: i } });
                }}
              >
                <Stroke stroke={stroke} />
              </TouchableOpacityG>
            )
        )}
      </>
    );
  else
    return (
      <>
        {strokes.map(
          (stroke, i) =>
            depth === stroke.depth &&
            view === stroke.view && (
              <Stroke key={i} stroke={stroke} opacity={0.3} />
            )
        )}
      </>
    );
};

export default StrokeRenderer;
