import React from "react";

import { Tool, PaperScope } from "@psychobolt/react-paperjs";
import SimpleStrokeCustomPaper from "../paper-object/SimpleStrokeCustom";
const no_op = () => {};

const defaultProps = {
  onKeyDown: no_op,
  onKeyUp: no_op,
  onMouseDown: no_op,
  onMouseDrag: no_op,
  onMouseUp: no_op,
  onPathInit: no_op,
  onPathAdd: no_op,
  onSegmentAdd: no_op,
  onSegmentRemove: no_op
};
const MOUSE_LEFT_CODE = 0;

// use path from it
class StrokeSimpleToolComponent extends React.Component {
  static defaultProps = {
    ...defaultProps,

    pathProps: {
      strokeColor: "blue"
    }
  };

  //instance variable
  path;

  onMouseDown = toolEvent => {
    const { paper, pathProps } = this.props;
    //toolEvent from paperjs
    if (
      toolEvent.event.type === "touchstart" ||
      toolEvent.event.button === MOUSE_LEFT_CODE
    ) {
      //todo may fold smoothFactor into pathProps
      this.path = new SimpleStrokeCustomPaper({
        ...pathProps,
        project: paper.project
      }); // how to set the paper project for this?  it is part of the props?
      this.path.smoothFactor = 10;
    }
  };

  onMouseDrag = toolEvent => {
    //toolEvent from paperjs
    if (toolEvent.event.type === "touchmove" || toolEvent.event.buttons === 1) {
      if (this.path) this.path.add(toolEvent.point);
      else console.log("no path"); //shouldn't happen
    }
  };

  onMouseUp = event => {
    const { path } = this;
    const { actions, states } = this.props;
    if (!path) return;

    let strokeData = {
      pathData: path.pathData

      // strokeColor: pathProps.strokeColor,
      // fillColor: pathProps.fillColor,

      // layer: activeLayer,

      // properties: getProperty[object_type](paperPath),
    };

    //let strokes = [...states.shapes.strokes, strokeData];

    // actions.setShapeData({...states.shapes, strokes: strokes})

    console.log("adding burshytype call dispatch", this.props.brushType);
    /*
  // no , should be the path? fiux the reducer?
  //  see getObjects

  const getObjects = ({ids, shapes}) => ids.map(pathId => {
  // properties is protostage specific extraction to display , it is pathData that is from paper and passed back
  const {id, ...rest} = shapes[pathId];

  return React.createElement(COMP_MAP[rest.type], {
    key: id,
    data: {shapeId: id}, // paperjs custom data field
    ...rest
  });
});

->
  dispatch(AddBrush({brushType:this.props.brushType,
    points}))

*/

    this.path.remove();
    this.path = null;
  };

  render() {
    const { innerRef, ...rest } = this.props;
    return (
      <Tool
        {...rest}
        ref={innerRef}
        onMouseDown={this.onMouseDown}
        onTouchMove={this.onMouseDrag}
        onMouseDrag={this.onMouseDrag}
        onMouseUp={this.onMouseUp}
      />
    );
  }
}

// default react scripts don't support @PaperScope decorator
let StrokeSimpleTool = PaperScope(StrokeSimpleToolComponent);
export default React.forwardRef((props, ref) => (
  <StrokeSimpleTool innerRef={ref} {...props} />
));
