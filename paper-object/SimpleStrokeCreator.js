import React from "react";
import invariant from "invariant";
import SimpleStrokeCustomPaper from "./SimpleStrokeCustom";
export function SimpleStrokeCreator(paper, props) {
  //todo how to pass context?
  if (!props.position) props.position = [0, 0]; // set default
  if (!props.strokeColor) props.strokeColor = "black"; // set default
  if (!props.strokeWidth) props.strokeWidth = 3; // set default
 debugger
  props.project = paper.project; // init as this is created


  //BrushCustomPaper  is a paperjs object instance
  var brush = new SimpleStrokeCustomPaper(props); //todo  becomes {...default,...props}
  return brush;
}

export const SimpleStrokeType = "SimpleStroke"; //match the custom type registered in renderer
export const SimpleStrokeComponent = React.forwardRef((props, ref) => (
  <SimpleStrokeType ref={ref} {...props} />
));
