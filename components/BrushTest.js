import { Component, Fragment,useEffect } from "react";
import React from "react";
import invariant from "invariant"
function BrushCanvas({className,height,width}) {
  return (<canvas className={className} height={height} width={width})/>)
}
export default class BrushTest extends Component {

}

function BrushTest({canvasRef}) {
    if (this.canvasOverlayRef.current) {
      let overlay = this.canvasOverlayRef.current.getContext("2d");
      this.drawOverlay(this.canvasOverlayRef.current, overlay);
    }

  return (
      <div
        className="canvas_container"
      >
        <BrushCanvas
          className="canvas"
          ref={canvasRef}
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
  )
}