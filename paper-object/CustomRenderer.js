import { ShapeType, ShapeCreator } from "./ShapeCreator";
import { PaperRenderer } from "@psychobolt/react-paperjs";

let instanceMapping = {
  [ShapeType]: (props, paper) => {
    let { type, ...rest } = props;
    return ShapeCreator(paper, type, rest);
  }
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
