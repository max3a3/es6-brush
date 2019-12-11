// @flow
import React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';
import paper from "paper";
import getBrush, {initBrush} from "../components/brush_class";
import {AddBrush} from "../components/actions";
import _ from 'lodash'
import invariant from "invariant";
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
class BrushThinToolComponent extends React.Component {

  static defaultProps = {
    ...defaultProps,

    pathProps: {
      fillColor: 'white',
      strokeColor: 'red',
      //todo double check these to make sure paperjs can slot this in the styles
      strokeSize: 2,
      transformModes: [],
      shadow: false, // from default value
    },
  }

  constructor(props) {
    super(props)
    this.brushCache = [];
  }

  componentDidUpdate(prevProps) {

    //todo optimize only handle my brush, may be passed in
    this.brush = getBrush(this.props.brushType)
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
      let mouseDown = toolEvent.point  // property


      this.brush.beginStroke(
        pathProps.strokeColor,
        pathProps.strokeSize,
        pathProps.transformModes,
        mouseDown.x,
        mouseDown.y,
        pathProps.shadow
      );
      this.isDrawing = true;

      this.brushCache.length = 0; // cache the mouse points when drawing to pass to react data
      this.brushCache.push([mouseDown.x, mouseDown.y]);

    }
  }

  // static member so this is bound properly
  onMouseDrag = (toolEvent) => {

    if (this.isDrawing) {
      let mouseDown = toolEvent.point  // property
      this.brush.doStroke(mouseDown.x, mouseDown.y);
      this.brushCache.push([mouseDown.x, mouseDown.y]);
    }
  }

  onMouseUp = (event) => {
    if (this.isDrawing) {
      this.brush.endStroke();

      this.isDrawing = false;

      debugger
      let {dispatch} = this.props
      let points = _.clone(this.brushCache)
      dispatch(AddBrush({
          brushType: this.props.brushType,
          points
        }
        )
      )
      this.clear()
    }

  }

  clear() {
    let {paper} = this.props.paper;
    // paper.project.clear();  // for tool that create paperobject as preview
debugger
    let canvas = paper.view.element
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    }

  render() {
    const {innerRef, ...rest} = this.props;
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
let BrushThinTool = PaperScope(BrushThinToolComponent)
export default React.forwardRef((props, ref) => <BrushThinTool innerRef={ref} {...props} />);
