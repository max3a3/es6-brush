import {Component, Fragment, useRef,createRef} from "react";
import React from "react";
import invariant from "invariant";

import getBrush, {initBrush} from "../brushes/brush_class";
import {_canvasWidth, _canvasHeight} from "../tconfig";
import _ from 'lodash'
import paper from "paper";
import {TOOLS} from '../config'

import {
  PaperContainer,
} from "@psychobolt/react-paperjs";
import {getTool} from "./getTool";

export let STROKE = [];
STROKE[0] = [
  [60.25227355957031, 188.42529296875],
  [73.7694320678711, 179.9921875],
  [77.14872741699219, 177.18115234375],
  [82.21765899658203, 173.24569702148438],
  [86.72338104248047, 169.8724365234375],
  [91.22909545898438, 166.49920654296875],
  [96.29803466796875, 162.56375122070312],
  [103.05661010742188, 158.6282958984375],
  [110.94161987304688, 154.13064575195312],
  [118.82662963867188, 150.75741577148438],
  [127.27485656738281, 146.82196044921875],
  [136.84951782226562, 142.32431030273438],
  [144.73452758789062, 138.9510498046875],
  [150.9298858642578, 135.01559448242188],
  [157.6884765625, 131.08013916015625],
  [163.8838348388672, 127.14471435546875],
  [168.95277404785156, 123.20925903320312],
  [174.02171325683594, 119.83599853515625],
  [178.5274200439453, 117.02496337890625],
  [183.03314208984375, 113.6517333984375]
];
STROKE[1] = [
  [186.97564697265625, 111.40289306640625],
  [190.91815185546875, 109.15408325195312],
  [194.86065673828125, 106.90524291992188],
  [197.67674255371094, 104.65640258789062],
  [200.49281311035156, 102.96978759765625],
  [203.3088836669922, 101.84536743164062],
  [206.12496948242188, 100.72097778320312],
  [208.37782287597656, 100.72097778320312],
  [210.63067626953125, 100.72097778320312],
  [212.883544921875, 101.84536743164062],
  [214.57318115234375, 103.53201293945312],
  [215.69961547851562, 106.90524291992188],
  [216.8260498046875, 109.15408325195312]
];

export default class BrushCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.brushColor = "blue";
    this.brushSize = 2;
    this.transformModes = [];
    this.shadow = false;

    this.brushCache = []; //todo see particle demo sketchjs how to preload array
    this.paperJsRef = createRef()

    let {state,dispatch} = this.props
    debugger// check vars state,dispatch
    this.toolsRef = {}
    TOOLS.forEach(t=>this.toolsRef[t]=createRef())
    let toolProp = this.getToolProp()
    this.tool_components = TOOLS.map((tool, i)=>
       getTool(tool, i, this.toolsRef[tool],toolProp)
    )
  }
  getToolProp()
  {
    let {state,dispatch,brushType} = this.props

    return {state,dispatch,brushType}
  }

  componentDidMountX() {// old one uses canvas
    invariant(this.canvasRef.current, "ref not inited");
    let context = this.canvasRef.current.getContext("2d");
    invariant(context, "no context");

    this.paperRef = new paper.PaperScope()
    this.paperRef.setup(this.canvasRef.current);

    initBrush(context, this.paperRef);

    this.brush = getBrush(this.props.brushType);



  }
  componentDidMount() { // new one uses paper contaioner
    invariant(this.paperJsRef.current, "ref not inited");
    debugger//find context
    let context = this.paperJsRef.current.canvas.current.getContext('2d')
    initBrush(context, this.paperJsRef.current);

    let toolProp = this.getToolProp() //todo this is a duplicated in componentDidMount
/*    TOOLS.map(t=>{
      let ttt = this.toolsRef[t].current
      debugger
      this.toolsRef[t].current.setup(toolProp)
    })
*/
  }

  componentDidUpdate(prevProps) { //todo: obsolete with Tool api
    // handles when the app change the active brush
    if (this.props.brushType !== prevProps.brushType) {
      this.brush = getBrush(this.props.brushType);
/*
      //todo mimic componentDidUpdate flow for Tool component too
      debugger
      let toolProp = this.getToolProp()
      TOOLS.map(t=>this.toolsRef[t].current.setup(toolProp))
  */
    }
  }

  replayStroke(i) {
    let s = STROKE[i];
    invariant(s.length, "index invalid");
    this.brush.beginStroke(
      this.brushColor,
      this.brushSize,
      this.transformModes,
      s[0][0],
      s[0][1]
    );
    for (let i = 1; i < s.length; i++) {
      this.brush.doStroke(s[i][0], s[i][1]);
    }
    this.brush.endStroke();
  }

  clear() {
    let canvas = this.canvasRef.current;
    let context = this.canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  mouseDown = event => {
    console.log("mousedown");
    let [x, y] = this.getLocalXY(event);
    this.brush.beginStroke(
      this.brushColor,
      this.brushSize,
      this.transformModes,
      x,
      y,
      this.shadow
    );
    this.isDrawing = true;

    this.brushCache.length = 0; // cache the mouse points when drawing to pass to react data
    this.brushCache.push([x, y]);
  };

  getLocalXY(event) {
    let x, y;

    let currentTargetRect = event.currentTarget.getBoundingClientRect();

    if (event.pageY === undefined) {
      y = event.targetTouches[0].pageY - currentTargetRect.top; //- this.canvasRef.current.offsetTop;
    } else {
      y = event.pageY - currentTargetRect.top;
    }
    if (event.pageX === undefined) {
      x = event.targetTouches[0].pageX - currentTargetRect.left; //- this.canvasRef.current.offsetLeft;
    } else {
      x = event.pageX - currentTargetRect.left;
    }

    return [x, y];
  }

  mouseMove = event => {
    if (this.isDrawing) {
      let [x, y] = this.getLocalXY(event);
      this.brush.doStroke(x, y);
      this.brushCache.push([x, y]);
    }
  };

  debug() {
    console.log("brush points");
    let json_value = JSON.stringify(this.brushCache, undefined, 2);
    console.log(json_value);
  }

  mouseUp = event => {
    if (this.isDrawing) {
      this.brush.endStroke();
      this.debug();
    }
    this.isDrawing = false;

    if (this.props.onAddBrush) {
      this.props.onAddBrush({points: _.clone(this.brushCache)})
      this.clear()
    }
  };

  renderx() {
    let _class = this.props.className || "main-canvas"
    return (
      <canvas
        className={_class}
        ref={this.canvasRef}
        height={this.props.height}
        width={this.props.width}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        onMouseMove={this.mouseMove}
        onTouchStart={this.mouseDown}
        onTouchMove={this.mouseMove}
        onTouchEnd={this.mouseUp}
        onTouchCancel={this.mouseUp}
      />
    );
  }

  // use paper container or manual has paper
  render() {
    let _class = this.props.className || "main-canvas"
    return <PaperContainer
      ref={this.paperJsRef}
      canvasProps={{className: _class, width: 800, height: 600}}
    >
      {this.tool_components}
    </PaperContainer>

  }
}

/*

todo need to create direct paper with that canvas
don't use papercontainer which is for react

so we have two paper scope!
 */
