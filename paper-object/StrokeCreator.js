import React from "react";
import invariant from "invariant";
import StrokeCustomPaper from "./StrokeCustom";
// this is for with stroke with canvas stamping
export function StrokeCreator(paper, props) {
  //todo how to pass context?
  if (!props.position) props.position = [0, 0]; // set default
  if (!props.strokeColor) props.strokeColor = "black"; // set default
  if (!props.strokeWidth) props.strokeWidth = 3; // set default
  props.project = paper.project; // init as this is created


  //BrushCustomPaper  is a paperjs object instance
  var brush = new StrokeCustomPaper(props); //todo  becomes {...default,...props}
  return brush;
}

export const StrokeType = "Stroke"; //match the custom type registered in renderer
export const StrokeComponent = React.forwardRef((props, ref) => (
  <StrokeType ref={ref} {...props} />
));
