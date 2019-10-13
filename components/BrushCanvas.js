import { Component, Fragment } from "react";
import React from "react";
import invariant from "invariant";

import getBrush, { initBrush } from "./brush_class";
import { _canvasWidth, _canvasHeight } from "../tconfig";

let STROKE = [];
STROKE[0] = [
  [170.9908447265625, 234.88650512695312],
  [188.4505615234375, 238.82196044921875],
  [200.278076171875, 237.69754028320312],
  [213.7952880859375, 234.32431030273438],
  [222.806640625, 230.9510498046875],
  [229.0020751953125, 228.70223999023438],
  [232.38134765625, 225.3289794921875],
  [234.0709228515625, 221.39352416992188],
  [235.1973876953125, 216.8958740234375],
  [235.1973876953125, 214.64703369140625],
  [235.1973876953125, 214.0848388671875]
];
STROKE[1] = [
  [81.439697265625, 226.45339965820312],
  [79.1868896484375, 228.1400146484375],
  [77.4971923828125, 229.82662963867188],
  [75.244384765625, 232.07546997070312],
  [71.8651123046875, 235.44869995117188],
  [68.4857177734375, 239.3841552734375],
  [64.543212890625, 242.1951904296875],
  [62.2904052734375, 245.56845092773438],
  [61.1639404296875, 249.50387573242188],
  [63.4168701171875, 255.1259765625],
  [65.1064453125, 256.8125915527344]
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
  }
  drawOverlay(canvas, context) {
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
    this.brush.replay(s);
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
  };

  getLocalXY(event) {
    let x, y;
    if (event.pageY === undefined) {
      y = event.targetTouches[0].pageY - this.canvasRef.current.offsetTop;
    } else {
      y = event.pageY - this.canvasRef.current.offsetTop;
    }
    if (event.pageX === undefined) {
      x = event.targetTouches[0].pageX - this.canvasRef.current.offsetLeft;
    } else {
      x = event.pageX - this.canvasRef.current.offsetLeft;
    }

    return [x, y];
  }

  mouseMove = event => {
    if (this.isDrawing) {
      let [x, y] = this.getLocalXY(event);
      this.brush.doStroke(x, y);
    }
  };

  mouseUp = event => {
    if (this.isDrawing) {
      this.brush.endStroke();
      this.brush.debug();
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
