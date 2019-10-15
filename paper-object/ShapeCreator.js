import React from "react";
import invariant from "invariant";

// todo how to default props on fiber component

// second param is props spreading
export function ShapeCreator(
  paper,
  type = "circle",
  {
    radius = [10, 20],
    position = [130, 140],
    fillColor = "red",
    strokeColor = "blue",
    width = "100",
    height = "80",
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
  if (type === "rectangle") {
    //position, width, height, radius
    let rectangle = new paper.Rectangle(0, 0, width, height);
    shape = new paper.Shape.Rectangle({
      rectangle,
      radius,
      fillColor,
      strokeColor
    });
    shape.position = position;
  }
  invariant(shape, "wrong type");
  return shape;
}

export const ShapeType = "Shape"; //match the custom type registered in renderer
export const ShapeComponent = React.forwardRef((props, ref) => (
  <ShapeType ref={ref} {...props} />
));
