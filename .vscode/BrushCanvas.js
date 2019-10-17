import { Component, Fragment } from "react";
import React from "react";
import invariant from "invariant";

import getBrush, { initBrush } from "./brush_class";
import { _canvasWidth, _canvasHeight } from "../tconfig";

let STROKE = [];
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
    this.canvasOverlayRef = React.createRef();
    this.brushColor = "blue";
    this.brushSize = 2;
    this.transformModes = [];
    this.shadow = false;

    this.brushCache = []; //todo see particle demo sketchjs how to preload array
  }
  drawOverlay(canvas, context) {
    // just a test
    context.globalCompositeOperation = "source-over";

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 3;
    context.strokeStyle = "green";

    context.beginPath();
    context.moveTo(0, 50);
    context.lineTo(100, 50);
    context.stroke();
  }
  componentDidMount() {
    invariant(this.canvasRef.current, "ref not inited");
    let context = this.canvasRef.current.getContext("2d");
    invariant(context, "no context");
    initBrush(context);
    this.brush = getBrush();

    if (this.canvasOverlayRef.current) {
      let overlay = this.canvasOverlayRef.current.getContext("2d");
      this.drawOverlay(this.canvasOverlayRef.current, overlay);
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
    let canvas = this.canvasOverlayRef.current;
    let context = this.canvasOverlayRef.current.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context = this.canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  mouseDown = event => {
    console.log("mousedown");
    let [x, y] = this.getLocalXY(event);
    getBrush().beginStroke(
      this.brushColor,
      this.brushSize,
      this.transformModes,
      x,
      y,
      this.shadow
    );
    this.isDrawing = true;

    this.brushCache.length = 0;
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
  };

  render() {
    return (
      <div
        className="canvas_container"
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        onMouseMove={this.mouseMove}
        onTouchStart={this.mouseDown}
        onTouchMove={this.mouseMove}
        onTouchEnd={this.mouseUp}
        onTouchCancel={this.mouseUp}
      >
        <canvas
          className="canvas"
          ref={this.canvasRef}
          height={_canvasHeight}
          width={_canvasWidth}
        />

        <canvas
          className="canvas_overlay"
          ref={this.canvasOverlayRef}
          height={_canvasHeight}
          width={_canvasWidth}
        />
      </div>
    );
  }
}
