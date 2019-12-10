import {ShapeType, ShapeCreator} from "./ShapeCreator";
import {BrushType, BrushCreator} from "./BrushCreator";
import {StrokeType, StrokeCreator} from "./StrokeCreator";
import {SimpleStrokeCreator, SimpleStrokeType} from "./SimpleStrokeCreator";
import {PaperRenderer} from "@psychobolt/react-paperjs";

let instanceMapping = {
  [ShapeType]: (props, paper) => {
    let {type, ...rest} = props;
    return ShapeCreator(paper, type, rest);
  },
  [BrushType]: (props, paper) => BrushCreator(paper, props),
  // [StrokeType]: (props, paper) => StrokeCreator(paper, props) NOT YET this is the one with stamping
  [SimpleStrokeType]: (props, paper) => SimpleStrokeCreator(paper, props)
};

// register custom type here
export default class CustomRenderer extends PaperRenderer {
  getInstanceFactory() {
    return {
      ...this.defaultTypes,
      ...instanceMapping
    };
  }
}
