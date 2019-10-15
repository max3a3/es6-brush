import React from "react";

// todo how to default props on fiber component

// second param is props spreading
export function ShapeCreator(
  paper,
  {
    type = "circle",
    radius = 32,
    position = [80, 120],
    fillColor = "red",
    strokeColor = "blue"
  }
) {
  let shape;
  if (type === "circle")
    shape = new paper.Shape.Circle({
      center: position,
      radius: radius,
      fillColor: fillColor,
      strokeColor: strokeColor
    });
  return shape;
}

export const ShapeType = "Shape"; //match the custom type registered in renderer
export const ShapeComponent = React.forwardRef((props, ref) => (
  <ShapeType ref={ref} {...props} />
));
