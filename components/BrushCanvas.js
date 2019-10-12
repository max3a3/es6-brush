import { Component, Fragment } from "react";
import React from "react";
import invariant from "invariant";

import getBrush, { initBrush } from "./brush_class";
import { _canvasWidth, _canvasHeight } from "../tconfig";

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
