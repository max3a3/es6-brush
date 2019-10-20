import React from "react";
import invariant from "invariant";
import BrushCustomPaper from "./BrushCustom";
export function BrushCreator(paper, props) {
  //todo how to pass context?
  if (!props.position) props.position = [0, 0]; // set default
  if (!props.strokeColor) props.strokeColor = "black"; // set default
  if (!props.strokeWidth) props.strokeWidth = 3; // set default
  props.project = paper.project; // init as this is created
  var brush = new BrushCustomPaper(props); //todo  becomes {...default,...props}
  return brush;
}

export const BrushType = "Brush"; //match the custom type registered in renderer
export const BrushComponent = React.forwardRef((props, ref) => (
  <BrushType ref={ref} {...props} />
));
