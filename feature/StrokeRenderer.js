import React from "react";
import TouchableOpacityG from "../components/TouchableOpacityG";
import Stroke from "./Stroke";

const StrokeRenderer = ({ drawState, viewIsFront, depth, strokes }) => {
  const view = viewIsFront ? "front" : "back";
  if (drawState === "VIEWING")
    return (
      <>
        {strokes.map(
          (stroke, i) =>
            depth === stroke.depth &&
            view === stroke.view && (
              <TouchableOpacityG key={i}>
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
