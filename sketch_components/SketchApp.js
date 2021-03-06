import React, { Component, useRef, useEffect, useReducer } from "react";
import SketchCanvas from "./SketchCanvas";
import SketchControls from "./SketchControls";
import BrushCanvas from "./BrushCanvas";
import StampCanvas from "./StampCanvas";
import {sketchpadReducer, INITIAL_STATE} from "./sketch_reducer";

export default function SketchApp() {
  const [state, dispatch] = useReducer(sketchpadReducer, INITIAL_STATE);

  return (
    <div>
      {/*todo follow index.html and need to add more canvas*/}
      <div id="cBound">
        <canvas id="ctx_box" className={"sp_canvas"} style={{zIndex: 1}}></canvas>
        <canvas id="ctx_tempX" className={"sp_canvas"} style={{zIndex: 2}}></canvas>
        <canvas id="ctx_active"  className={"sp_canvas"} style={{zIndex: 5}}></canvas>
        <canvas id="ctx_marquee" className={"sp_canvas"} style={{zIndex: 6}}></canvas>
        {/*<canvas id="ctx_mouse" className={"sp_canvas"} style={{zIndex: 7}}></canvas>*/}
        <SketchCanvas/>
    </div>
      <SketchControls state={state} dispatch={dispatch}/>
      <div id="offscreen">

      <BrushCanvas state={state}/>

      {/*<canvas id="ctx_stamp" width="200" height="200"></canvas> */}
      <StampCanvas state={state}/>
      <br/>
      <canvas id="ctx_eraser" width="200" height="200"></canvas>
      <canvas id="ctx_picker" height="1" width="1"></canvas>
      </div>
    </div>
  )
}

