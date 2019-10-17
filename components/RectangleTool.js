import React from 'react';
import * as ReactPaperJS from "@psychobolt/react-paperjs"

const {Tool, PaperScope} = ReactPaperJS;
const MOUSE_LEFT_CODE = 0;

const no_op = () => {
}

const defaultProps = {
  onKeyDown: no_op,
  onKeyUp: no_op,
  onMouseDown: no_op,
  onMouseDrag: no_op,
  onMouseUp: no_op,
  onPathInit: no_op,
  onPathAdd: no_op,
  onSegmentAdd: no_op,
  onSegmentRemove: no_op,
}

// $FlowFixMe
// @PaperScope   inject this.props.paper
class RectangleToolComponent extends React.Component {

  static defaultProps = {
    ...defaultProps,

    pathProps: {
      fillColor: 'white',
      strokeColor: 'black',
    },
  }

  constructor(props) {
    super(props)
  }

  //instance variable
  mouseDown
  path
  selectionColor = null
  // static member so this is bound properly
  onMouseDown = (toolEvent) => {
    const {pathProps, onMouseDown, onPathInit, paper} = this.props;
    //toolEvent from paperjs
    if (toolEvent.event.type === 'touchstart' || toolEvent.event.button === MOUSE_LEFT_CODE) {
      this.mouseDown = toolEvent.point
    }
  }

  // static member so this is bound properly
  onMouseDrag = (toolEvent) => {

    //toolEvent from paperjs
    if (toolEvent.event.type === 'touchmove' || toolEvent.event.buttons === 1) {
      const {paper} = this.props;
      if (!this.selectionColor)
        this.selectionColor = new paper.Color(0.9, 0.9, 0, 0.75)

      let rect = new paper.Rectangle(this.mouseDown, toolEvent.point);
      // debugger //chck for shift
      if (toolEvent.modifiers.shift) { //todo still buggy need to look at the custom object creation
        if (rect.width > rect.height)
          rect.height = rect.width;
        else
          rect.width = rect.height;
      }

      this.path = new paper.Path.Rectangle(rect);
      this.path.fillColor = this.selectionColor

      // Remove this path on the next drag event:
      this.path.removeOnDrag();
    }
  }

  onMouseUp = (event) => {
    const {path} = this;
    const {onPathAdd} = this.props;

  }


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
let RectangleTool = PaperScope(RectangleToolComponent)
export default React.forwardRef((props, ref) => <RectangleTool innerRef={ref} {...props} />);
