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
  setInfoStroke,
}) => {
  const view = viewIsFront ? "front" : "back";
  if (drawState === DrawStates.Navigating || drawState === DrawStates.Viewing)
    return (
      <>
        {strokes.map(
          (stroke, i) =>
            depth === stroke.depth &&
            view === stroke.view && (
              <TouchableOpacityG
                key={i}
                onPress={() => {
                  setInfoStroke(stroke);
                  setDrawState(DrawStates.Viewing);
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
            view === stroke.view && <Stroke key={i} stroke={stroke} />
        )}
      </>
    );
};

export default StrokeRenderer;
