import { Component, Fragment, useEffect, useRef } from "react";
import React from "react";
import invariant from "invariant";
import { _canvasWidth, _canvasHeight } from "../tconfig";
import BrushCanvas from "./BrushCanvas";

function drawOverlay(canvas, context) {
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

export default function BrushTest({ canvasRef, height, width }) {
  let canvasOverlayRef = useRef(null);
  useEffect(() => {
    if (canvasOverlayRef.current) {
      let overlay = canvasOverlayRef.current.getContext("2d");
      drawOverlay(canvasOverlayRef.current, overlay);
    }
  }, []);

  return (
    <div className="canvas_container">
      <BrushCanvas
        className="canvas"
        ref={canvasRef}
        height={_canvasHeight}
        width={_canvasWidth}
      />
    </div>
  );
}
/*
      <canvas
        className="canvas_overlay"
        ref={canvasOverlayRef}
        height={_canvasHeight}
        width={_canvasWidth}
      />
*/
