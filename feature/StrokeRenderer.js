import React from "react";
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
              <Stroke
                key={i}
                onPress={() => {
                  setDrawState(DrawStates.Viewing);
                  updateLiveStroke({ do: "set", props: { ...stroke, i: i } });
                }}
                stroke={stroke}
              />
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
              <Stroke
                key={i}
                stroke={stroke}
                opacity={(drawState = DrawStates.Factoring ? 1 : 0.2)}
              />
            )
        )}
      </>
    );
};

export default StrokeRenderer;
