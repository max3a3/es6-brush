import { Component } from "react";
import React from "react";
import invariant from "invariant";

import { _canvasWidth, _canvasHeight } from "../tconfig";

export default class WidgetCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.brushColor = "blue";
    this.brushSize = 2;
    this.transformModes = [];
    this.shadow = false;
  }

  componentDidMount() {
    invariant(this.canvasRef.current, "ref not inited");
    let context = this.canvasRef.current.getContext("2d");
    invariant(context, "no context");
  }

  mouseDown = event => {
    this.isDrawing = true;
    return true;
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
    }
     return true;
 };

  mouseUp = event => {
    this.isDrawing = false;
     return true;
 };

  render() {
    return (
      <canvas
        className="canvas_overlay"
        ref={this.canvasRef}
        height={_canvasHeight}
        width={_canvasWidth}
        id="canvas"
        onxMouseDown={this.mouseDown}
        onxMouseUp={this.mouseUp}
        onxMouseMove={this.mouseMove}
      />
    );
  }
}
